"use client";

import { createContext, useContext, ReactNode } from "react";

// Using any for the dictionary to allow for flexible deep property access 
// without complex recursive type overhead in components.
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Dictionary = any;

const I18nContext = createContext<{
  dict: Dictionary;
  locale: string;
} | null>(null);

export function I18nProvider({
  children,
  dict,
  locale,
}: {
  children: ReactNode;
  dict: Dictionary;
  locale: string;
}) {
  return (
    <I18nContext.Provider value={{ dict, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
