'use client';
import { email, maxLength, object, parse, string } from "valibot";

import { useTranslation } from '~/app/i18n/client';
import { Lng } from '~/app/i18n/settings';

import { LoaderIcon } from 'lucide-react';
import * as React from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Input } from "~/components/ui/input";
import InputError from '~/components/ui/input-error';
import { Label } from "~/components/ui/label";
import { createContactRequest } from "~/models/contactRequest";

export default function ContactSection({ lang }: { lang: Lng }) {
    const { t } = useTranslation(lang);

    const { handleSubmit, setError, register, formState: { errors } } = useForm();

    const [showContactFormSuccessModal, setShowContactFormSuccessModal] = React.useState(false);

    const [submitting, setSubmitting] = React.useState(false);


    const onSubmit = (data: unknown) => {
        setSubmitting(true);

        const schema = object({
            companyName: string([maxLength(255)]),
            contactPerson: string([maxLength(255)]),
            email: string([maxLength(255), email()]),
            phone: string([maxLength(255)]),
            message: string([maxLength(65534)])
        });

        createContactRequest(parse(schema, data))
            .then(() => { setShowContactFormSuccessModal(true) })
            .catch((e: Error) => {
                console.error(e);
                setError("serverError", { type: "server", message: e.message });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="relative px-6 py-24 mx-auto mt-32 max-w-7xl sm:mt-40 lg:px-8 isolate sm:py-32 bg-gradient-conic at-top from-white via-cyan-100/5 to-magenta-100/20">
            <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,skyblue,transparent)]"
                aria-hidden="true">
                <defs>
                    <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-64"
                        patternUnits="userSpaceOnUse">
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y="-64" className="overflow-visible fill-gray-50">
                    <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
                        strokeWidth="0" />
                </svg>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
            </svg>
            <div className="max-w-xl mx-auto lg:max-w-4xl">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">{t('contactForm.headline')}</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">{t('contactForm.tagline')}</p>
                <div className="flex flex-col gap-16 mt-16 sm:gap-y-20 lg:flex-row">
                    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="lg:flex-auto">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="companyName">{t('contactForm.companyName')}</Label>
                                <Input type="text" required autoComplete="organization" {...register("companyName")} />

                                {errors.companyName && <InputError message={t('form.errors.required', { label: t('contactForm.comanyName') })} />}
                            </div>
                            <div>
                                <Label htmlFor="contactPerson">{t('contactForm.contactPerson')}</Label>
                                <Input type="text" required autoComplete="fullname" {...register("contactPerson")} />

                                {errors.contactPerson && <InputError message={t('form.errors.required', { label: t('contactForm.contactPerson') })} />}
                            </div>
                            <div>
                                <Label htmlFor="email">{t('contactForm.email')}</Label>
                                <Input type="email" required autoComplete="email" {...register("email")} />

                                {errors.email && <InputError message={t('form.errors.required', { label: t('contactForm.email') })} />}
                            </div>
                            <div>
                                <Label htmlFor="phone">{t('contactForm.phone')}</Label>
                                <Input type="text" required autoComplete="tel" {...register("phone")} />

                                {errors.phone && <InputError message={t('form.errors.required', { label: t('contactForm.phone') })} />}
                            </div>
                            <div>
                                <Label htmlFor="message">{t('contactForm.message')}</Label>
                                <textarea {...register("message")} rows={4}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                {errors.message && <InputError message={t('form.errors.required', { label: t('contactForm.message') })} />}
                            </div>
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {submitting ? (<LoaderIcon />) : t('contactForm.submit')}
                            </button>
                        </div>
                    </form>
                </div>

                <Dialog open={showContactFormSuccessModal} defaultOpen={false} modal={true}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('contactFormSuccessModal.headline')}</DialogTitle>
                            <div className='mt-2'>
                                <p className="text-sm text-gray-500">
                                    {t('contactFormSuccessModal.thanks')}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {t('contactFormSuccessModal.i_be_back')}
                                </p>
                            </div>
                        </DialogHeader>

                        <DialogFooter>
                            <button type="button"
                                className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-lg shadow-2xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r shadow-purple-400"
                                onClick={() => setShowContactFormSuccessModal(false)}>{
                                    t('contactFormSuccessModal.close')}</button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
