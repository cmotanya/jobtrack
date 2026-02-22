import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  // handle recovery flow
  if (token_hash && type === "recovery") {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      return NextResponse.redirect(origin + "/reset-password?success=true");
    }
    return NextResponse.redirect(origin + "login?error=" + error.message);
  }

  // magic link flow
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(origin + "/login?success=true");
    }
    return NextResponse.redirect(origin + "/login?error=" + error.message);
  }
}
