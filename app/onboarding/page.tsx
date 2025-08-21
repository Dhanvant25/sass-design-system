"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { ConnectAccountStep } from "@/components/onboarding/connect-account-step";
// import type { BrandAssetsStepHandle } from "@/components/onboarding/brand-assets-step"
import BrandAssetsStep, {
  BrandAssetsStepHandle,
} from "@/components/onboarding/brand-assets-step";
import { FirstPostStep } from "@/components/onboarding/first-post-step";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePost } from "@/api/apiMethode";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const steps = [
  { id: 1, title: "Welcome", component: WelcomeStep },
  { id: 2, title: "Connect Account", component: ConnectAccountStep },
  { id: 3, title: "Brand Assets", component: BrandAssetsStep },
  { id: 4, title: "First Post", component: FirstPostStep },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [brandAssetsData, setBrandAssetsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const brandAssetsRef = useRef<BrandAssetsStepHandle>(null);
  const router = useRouter();

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = async () => {
    const current = steps.find((step) => step.id === currentStep);

    if (current?.id === 3) {
      if (!brandAssetsRef.current) return;
      const isValid = await brandAssetsRef.current.validate();
      if (!isValid) return;

      const data = brandAssetsRef.current.getData();
      setBrandAssetsData(data);
    }

    if (currentStep < steps.length) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      if (brandAssetsData) {
        const { name, tagline, description, logoUrl } =
          brandAssetsData.formData;

        const payload = {
          name: name,
          tagLine: tagline,
          description: description,
          // logo: logoUrl,
          logo: "https://cdn.dribbble.com/userupload/42959723/file/original-e8d7c23522b6a5463d16b85b52189f4e.jpg?format=webp&resize=400x300&vertical=center",
        };

        try {
          setIsLoading(true);
          const { res, error } = await usePost("/api/agencies", payload);

          if (error) {
            console.error("API ERROR", error.data.message);
            toast.error(error.data.message || "Error occurred");
            return;
          }

          if (res?.success) {
            router.push("/agency");
            toast.success(res.data.message || "Agency created successfully");
          }
        } catch (error) {
          console.error("Error saving brand assets:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    window.location.href = "/dashboard";
  };

  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep
  )?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold">Getting Started</h1>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </div>
              </div>
              {currentStep == 4 && (
                <Button variant="ghost" onClick={handleSkip}>
                  Skip Setup
                </Button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep}>
                {CurrentStepComponent &&
                  (currentStep === 3 ? (
                    <CurrentStepComponent
                      ref={brandAssetsRef}
                      onNext={handleNext}
                    />
                  ) : (
                    <CurrentStepComponent onNext={handleNext} />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      step.id === currentStep
                        ? "bg-primary"
                        : completedSteps.includes(step.id)
                        ? "bg-primary/60"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="flex items-center"
                disabled={isLoading}
              >
                {currentStep === steps.length
                  ? isLoading
                    ? "Loading..."
                    : "Complete"
                  : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
