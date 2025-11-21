import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Basic phone validation (allows international formats)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      toast.success("Thank you for joining our waitlist!");
      setEmail("");
      setPhone("");
      setOpen(false);
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast.error(error instanceof Error ? error.message : "Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" className="bg-mizigo-dark hover:bg-mizigo-primary text-white font-semibold shadow-lg">
          Join Waitlist
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Join Our Waitlist</h4>
            <p className="text-sm text-muted-foreground">
              Be the first to know when our app launches!
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-mizigo-dark hover:bg-mizigo-primary text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}