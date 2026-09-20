import { useEffect } from "react"

export function useModalA11y(onClose) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement
    return () => {
      previouslyFocusedElement?.focus()
    }
  }, [])
}