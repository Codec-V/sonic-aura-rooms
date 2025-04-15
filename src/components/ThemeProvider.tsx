// ... existing imports ...

export function ThemeProvider({ children, ...props }: React.PropsWithChildren<any>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light" // Change this from "dark" to "light"
      enableSystem={true}
      {...props}
    >
      {children}
    </ThemeProvider>
  )
}