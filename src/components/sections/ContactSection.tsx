import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_50%)]"></div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex p-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Mail className="h-12 w-12 lg:h-16 lg:w-16 text-white/90" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-black mb-6 text-white">
            Let's Connect!
          </h2>

          <p className="text-lg lg:text-xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind, a question, or just want to say hi? I'd
            love to hear from you. Feel free to reach out and let's create
            something amazing together!
          </p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          asChild
          className="group bg-white/95 backdrop-blur-sm text-primary hover:bg-white hover:scale-105 shadow-sm hover:shadow-3xl transition-all duration-300 transform px-12 py-6 text-lg lg:text-xl font-bold rounded-2xl border-2 border-white/20"
        >
          <Link href="/contact">
            Get In Touch
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
