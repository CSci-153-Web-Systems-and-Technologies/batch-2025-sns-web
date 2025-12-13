"use client";

import { useState } from "react";
import { login, verifyEmail } from "./actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { SNSLogo } from "@/components/auth/sns-logo";
import { FormInput } from "@/components/auth/form-input";
import { SubmitButton } from "@/components/auth/submit-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await verifyEmail(formData);

    if (result.error) {
      setError(result.error);
      setIsPending(false);
    } else {
      setName(result.name || "Instructor");
      setStep(2);
      setIsPending(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("email", email);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[340px] sm:max-w-md bg-white border border-gray-200 shadow-xl relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#146939]"></div>

        <CardHeader className="space-y-2 text-center pb-4 sm:pb-6 border-b border-gray-100 pt-8">
          <SNSLogo size="lg" />

          {step === 1 ? (
            <CardDescription className="text-xs sm:text-sm text-gray-500 font-roboto mt-2">
              Faculty Access: Enter your email to continue
            </CardDescription>
          ) : (
            <div className="mt-2 space-y-1">
              <h2 className="text-xl font-bold text-[#17321A] font-montserrat">
                Welcome, {name}
              </h2>
              <CardDescription className="text-xs sm:text-sm text-gray-500 font-roboto">
                Please enter your password
              </CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-4 sm:pt-6">
          {step === 1 && (
            <form
              onSubmit={handleEmailSubmit}
              className="space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <FormInput
                id="email"
                label="Faculty Email"
                type="email"
                placeholder="professor.name@university.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 font-medium font-roboto">
                  {error}
                </div>
              )}

              <SubmitButton isPending={isPending} label="Continue" />
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <div className="text-center -mt-1">
                <span className="bg-[#146939]/5 text-[#146939] px-3 py-1 rounded-full text-xs font-semibold border border-[#146939]/20 inline-block">
                  {email}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[#17321A] font-bold font-roboto text-sm sm:text-base"
                  >
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-xs sm:text-sm font-medium text-[#00954f] hover:underline font-roboto"
                  >
                    Forgot password?
                  </a>
                </div>

                <FormInput
                  id="password"
                  label=""
                  type="password"
                  placeholder="••••••••"
                  required
                  className="-mt-2"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 font-medium font-roboto">
                  {error}
                </div>
              )}

              <SubmitButton isPending={isPending} label="Sign In" />

              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-500 hover:text-[#146939]"
                onClick={() => {
                  setStep(1);
                  setError(null);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Not you? Change email
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="justify-center pb-6 sm:pb-8 bg-gray-50/50 pt-6 rounded-b-xl">
          <p className="text-xs text-gray-500 text-center font-roboto px-4">
            © 2025 CSci 153 - Jonhei Akiu Lacre
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
