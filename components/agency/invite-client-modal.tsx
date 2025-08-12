"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { inviteClientSchema } from "@/schema/agency/inviteClientSchema";
import { Mail, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InviteClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const agencyBranding = {
  name: "Digital Marketing Pro",
  primaryColor: "#6366F1",
  domain: "clients.digitalmarketingpro.com",
};

type InviteClientFormData = {
  clientName: string;
  clientEmail: string;
  selectedPlan: string;
};

export function InviteClientModal({
  open,
  onOpenChange,
}: InviteClientModalProps) {
  const [inviteLink, setInviteLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<InviteClientFormData>({
    resolver: yupResolver(inviteClientSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      selectedPlan: "",
    },
  });

  const clientName = watch("clientName");
  const clientEmail = watch("clientEmail");
  const selectedPlan = watch("selectedPlan");

  const plans = [
    {
      value: "pro",
      label: "Pro Plan - $29/month",
      description: "Perfect for small businesses",
    },
    {
      value: "business",
      label: "Business Plan - $79/month",
      description: "Great for growing companies",
    },
    {
      value: "enterprise",
      label: "Enterprise Plan - $199/month",
      description: "For large organizations",
    },
  ];

  const handleGenerateLink = async () => {
    setIsGeneratingLink(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const linkId = Math.random().toString(36).substring(7);
    setInviteLink(`https://${agencyBranding.domain}/invite/${linkId}`);
    setIsGeneratingLink(false);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const onSubmit = (data: InviteClientFormData) => {
    console.log("Sending invite to:", data);

    // Handle invite logic here

    onOpenChange(false);
    reset();
    setInviteLink("");
  };

  const defaultMessage = `Hi ${clientName || "[Client Name]"},

You're invited to join ${
    agencyBranding.name
  }'s social media management platform!

We'll help you streamline your social media presence with:
• AI-powered content creation
• Automated scheduling across all platforms
• Comprehensive analytics and reporting
• Professional brand asset management

Click the link below to get started:
[Invitation Link]

If you have any questions, feel free to reach out to our team.

Best regards,
${agencyBranding.name} Team`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite New Client</DialogTitle>
          <DialogDescription>
            Send an invitation to a new client to join your agency portal
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Client Info */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Client Information</CardTitle>
              <CardDescription>
                Basic information about your new client
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input
                    id="client-name"
                    placeholder="Enter client name"
                    {...register("clientName")}
                  />
                  {errors.clientName && (
                    <p className="text-xs text-red-500">
                      {errors.clientName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email Address</Label>
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="client@company.com"
                    {...register("clientEmail")}
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-red-500">
                      {errors.clientEmail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan-select">Select Plan</Label>
                <Select
                  value={selectedPlan}
                  onValueChange={(val) =>
                    setValue("selectedPlan", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a plan for the client" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        <div>
                          <div className="font-medium">{plan.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {plan.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.selectedPlan && (
                  <p className="text-xs text-red-500">
                    {errors.selectedPlan.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Invitation Method */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Invitation Method</CardTitle>
              <CardDescription>
                Choose how to send the invitation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Invitation Link</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateLink}
                    disabled={isGeneratingLink || !clientName || !selectedPlan}
                  >
                    {isGeneratingLink ? "Generating..." : "Generate Link"}
                  </Button>
                </div>
                {inviteLink && (
                  <div className="flex gap-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                    >
                      {linkCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-message">
                  Custom Message (Optional)
                </Label>
                <Textarea
                  id="custom-message"
                  placeholder={defaultMessage}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use the default invitation message
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="border-border/50 bg-muted/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Invitation Preview</CardTitle>
              <CardDescription>
                How the invitation will appear to your client
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: agencyBranding.primaryColor }}
                  >
                    {agencyBranding.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{agencyBranding.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Social Media Management Platform
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>To:</strong> {clientEmail || "client@company.com"}
                  </p>
                  <p>
                    <strong>Subject:</strong> You're invited to join{" "}
                    {agencyBranding.name}
                  </p>
                  <p>
                    <strong>Plan:</strong>{" "}
                    {plans.find((p) => p.value === selectedPlan)?.label ||
                      "No plan selected"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              style={{ backgroundColor: agencyBranding.primaryColor }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
