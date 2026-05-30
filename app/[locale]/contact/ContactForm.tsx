'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setStatus('sending');
    try {
      const subject = `Portfolio Contact — ${data.name}`;
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      const mailto = `mailto:chikouche.hadjer@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      // Opens the visitor's email client with the message prefilled.
      window.location.href = mailto;
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const inputClass = cn(
    'w-full border border-border bg-transparent px-4 py-3 text-sm font-sans placeholder:text-muted focus:outline-none focus:border-foreground transition-colors'
  );

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="border border-border p-8 text-center">
        <p className="font-display font-600 text-xl mb-2" aria-hidden="true">✓</p>
        <p className="text-sm font-sans text-muted">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-xs text-muted uppercase tracking-widest font-sans mb-2">
          {t('name')}
        </label>
        <input
          id="contact-name"
          {...register('name')}
          placeholder={t('placeholder.name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={cn(inputClass, errors.name && 'border-red-400')}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-xs text-red-600 font-sans">
            {t('errors.name')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs text-muted uppercase tracking-widest font-sans mb-2">
          {t('email')}
        </label>
        <input
          id="contact-email"
          {...register('email')}
          type="email"
          placeholder={t('placeholder.email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={cn(inputClass, errors.email && 'border-red-400')}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-2 text-xs text-red-600 font-sans">
            {t('errors.email')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs text-muted uppercase tracking-widest font-sans mb-2">
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          rows={6}
          placeholder={t('placeholder.message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputClass, 'resize-none', errors.message && 'border-red-400')}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 text-xs text-red-600 font-sans">
            {t('errors.message')}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-xs text-red-600 font-sans">{t('error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full border border-foreground py-3 text-sm font-sans tracking-wide hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  );
}
