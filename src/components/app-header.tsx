'use client';

import { AdvancedImage, lazyload, placeholder, responsive } from '@cloudinary/react';

import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import Link from 'next/link';
import { useTranslation } from '~/app/i18n/client';
import { Lng } from '~/app/i18n/settings';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "~/components/ui/navigation-menu";
import { cloudinaryAppLogo } from '~/config';
import cld from '~/lib/cloudinary';

import { Button } from '~/components/ui/button';


export default function AppHeader({ lang }: { lang: Lng }) {
    const { i18n, t } = useTranslation(lang);
    const changeLocale = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const logo = cld.image(cloudinaryAppLogo);
    logo
        .resize(fill().width(64).height(64))
        .roundCorners(byRadius(25));

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <NavigationMenu className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">{t('app.title')}</span>
                        <AdvancedImage cldImg={logo} plugins={[responsive(), placeholder(), lazyload()]} className="w-auto h-8" />
                    </Link>
                </div>
                <NavigationMenuList className="lg:flex lg:gap-x-12">
                    <NavigationMenuItem>
                        <Link href={`/${lang}/uses`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {t('navigation.global.uses')}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={`/${lang}/projects`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {t('navigation.global.projects')}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 transition-all duration-300 ease-in-out text-cyan-500 group">
                            {i18n.language}

                            <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
                            </svg>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <Button onClick={() => changeLocale("da")} variant="ghost" disabled={i18n.language === "da"} className="block w-full px-4 py-2 text-sm leading-5 text-left transition-all duration-300 ease-in-out group">
                                <span className="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">da</span>
                            </Button>
                            <Button onClick={() => changeLocale("en")} variant="ghost" disabled={i18n.language === "en"} className="block w-full px-4 py-2 text-sm leading-5 text-left transition-all duration-300 ease-in-out group">
                                <span className="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">en</span>
                            </Button>
                            {/* {i18n.languages.map((language) => (
                  <Button onClick={() => changeLocale(language)} variant="ghost" disabled={i18n.language === language} key={language} className="block w-full px-4 py-2 text-sm leading-5 text-left transition-all duration-300 ease-in-out group">
                    <span className="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">{language}</span>
                  </Button>
                ))} */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </NavigationMenu>
        </header>
    );
}