'use client'

import { type FormEvent, useState, useTransition } from 'react'

import { LandingImage, SectionTitle } from './shared'
import { Reveal } from './shared-client'

import type { LandingPageContent } from './types'

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
};

const initialFormState: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  message: "",
  phone: "",
};

export function ContactSection({ contact }: { contact: LandingPageContent['contact'] }) {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"error" | "success" | null>(null);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setFeedbackType(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/form-submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        setFormState(initialFormState);
        setFeedback(contact.successMessage);
        setFeedbackType("success");
      } catch {
        setFeedback(contact.errorMessage);
        setFeedbackType("error");
      }
    });
  };

  const inputClassName =
    "w-full border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:px-[21px] lg:py-3";

  return (
    <section id="contact" className="bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(143,175,194,0.5)_100%)]">
      <div className="mx-auto max-w-[1440px] px-6 py-9 lg:px-[30px] lg:py-[130px]">
        <div className="space-y-6 lg:space-y-[70px]">
          <Reveal>
            <SectionTitle eyebrow={contact.eyebrow} title={contact.title} script={contact.script} />
          </Reveal>

          <div className="grid gap-0 lg:grid-cols-2 lg:items-end">
            <Reveal className="min-w-0">
              <LandingImage asset={contact.image} imgClassName="h-[412px] w-full object-cover lg:h-[clamp(560px,53vw,765px)] min-[1440px]:h-[765px]" />
            </Reveal>

            <Reveal
              x={30}
              className="min-w-0 bg-[linear-gradient(180deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)] p-5 lg:justify-self-end lg:-ml-[clamp(32px,6.25vw,90px)] lg:w-[calc(100%+clamp(32px,6.25vw,90px))] lg:-translate-y-[clamp(40px,5.625vw,81px)] lg:p-[clamp(28px,3.5vw,50px)] min-[1440px]:-ml-[90px] min-[1440px]:w-[min(780px,calc(100%+90px))] min-[1440px]:-translate-y-[81px] min-[1440px]:p-[50px]"
            >
              <div className="bg-white p-4 lg:p-10">
                <form className="space-y-4 lg:space-y-[22px]" onSubmit={handleContactSubmit}>
                  <div className="grid gap-4 lg:grid-cols-2 lg:gap-[22px]">
                    <input
                      type="text"
                      placeholder={contact.placeholders.firstName}
                      className={inputClassName}
                      value={formState.firstName}
                      onChange={(event) => setFormState((current) => ({ ...current, firstName: event.target.value }))}
                    />
                    <input
                      type="text"
                      placeholder={contact.placeholders.lastName}
                      className={inputClassName}
                      value={formState.lastName}
                      onChange={(event) => setFormState((current) => ({ ...current, lastName: event.target.value }))}
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2 lg:gap-[22px]">
                    <input
                      type="email"
                      placeholder={contact.placeholders.email}
                      className={inputClassName}
                      value={formState.email}
                      onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                    />
                    <input
                      type="tel"
                      placeholder={contact.placeholders.phone}
                      className={inputClassName}
                      value={formState.phone}
                      onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
                    />
                  </div>

                  <textarea
                    rows={1}
                    placeholder={contact.placeholders.message}
                    className="min-h-12 w-full resize-none border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:min-h-[212px] lg:px-[21px] lg:py-3"
                    value={formState.message}
                    onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                  />

                  {feedback ? (
                    <p className={`text-sm leading-[1.45] ${feedbackType === "error" ? "text-red-600" : "text-[#1F445A]"}`}>
                      {feedback}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full items-center justify-center bg-[#8FAFC2] px-5 py-[13px] text-base text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? "Надсилання..." : contact.submitLabel}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
