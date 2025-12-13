"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast-notification";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });

  const router = useRouter();
  const supabase = createClient();
  const { addToast } = useToast();

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      addToast("Passwords do not match.", "error");
      return;
    }

    if (passwords.new.length < 6) {
      addToast("Password must be at least 6 characters.", "error");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: passwords.new,
      data: { must_change_password: false },
    });

    if (error) {
      console.error("Error changing password:", error);
      addToast(error.message || "Failed to change password.", "error");
      setLoading(false);
    } else {
      addToast("Your password has been changed successfully.", "success");
      setLoading(false);
      onOpenChange(false);
      router.refresh();
    }
  };

  if (!open && !isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={cn(
          "bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform flex flex-col mx-4",
          isVisible
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-90 translate-y-8 opacity-0"
        )}
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#146939] to-[#00954f]"></div>

        <div className="px-6 pt-8 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-[#e6f4ea] flex items-center justify-center">
              <Lock className="h-5 w-5 text-[#146939]" />
            </div>
            <h2 className="text-2xl font-bold font-montserrat text-[#17321A]">
              Change Password
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-roboto">
            For security reasons, you must change your password before
            continuing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="new"
                className="text-[#17321A] font-bold font-roboto text-sm"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new"
                  name="new"
                  type={showPassword ? "text" : "password"}
                  value={passwords.new}
                  onChange={handleChange}
                  required
                  placeholder="Enter new password"
                  className="border-gray-200 focus:border-[#00954f] focus:ring-[#00954f] bg-gray-50/50 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirm"
                className="text-[#17321A] font-bold font-roboto text-sm"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm"
                name="confirm"
                type={showPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                className="border-gray-200 focus:border-[#00954f] focus:ring-[#00954f] bg-gray-50/50 rounded-xl"
              />
            </div>
          </div>

          <div className="p-6 pt-2 border-t border-gray-50 bg-gray-50/30 flex justify-end gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#146939] hover:bg-[#00954f] text-white font-montserrat w-full h-11 shadow-md hover:shadow-lg transition-all cursor-pointer rounded-xl"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
