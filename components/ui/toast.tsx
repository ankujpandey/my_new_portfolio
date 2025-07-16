"use client"

import * as React from "react"
import { X, CheckCircle, XCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, title, description, type = "info", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [isLeaving, setIsLeaving] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose(id)
    }, 300) // Match animation duration
  }

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-rose-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-amber-500" />
    }
  }

  const getStyles = () => {
    const baseStyles = "relative flex items-start space-x-3 p-4 rounded-xl shadow-xl backdrop-blur-md border max-w-sm"

    switch (type) {
      case "success":
        return cn(
          baseStyles,
          "bg-emerald-50/95 border-emerald-200/50 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-400/30 dark:text-emerald-100",
        )
      case "error":
        return cn(
          baseStyles,
          "bg-rose-50/95 border-rose-200/50 text-rose-800 dark:bg-rose-900/20 dark:border-rose-400/30 dark:text-rose-100",
        )
      case "info":
      default:
        return cn(
          baseStyles,
          "bg-amber-50/95 border-amber-200/50 text-amber-800 dark:bg-amber-900/20 dark:border-amber-400/30 dark:text-amber-100",
        )
    }
  }

  return (
    <div
      className={cn(
        getStyles(),
        "transform transition-all duration-300 ease-in-out",
        isLeaving
          ? "translate-y-full opacity-0 scale-95"
          : "translate-y-0 opacity-100 scale-100 animate-in slide-in-from-bottom-full",
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold leading-5">{title}</p>}
        {description && <p className={cn("text-sm leading-5", title ? "mt-1 opacity-90" : "")}>{description}</p>}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-4 inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600 dark:focus:ring-offset-gray-800 transition-colors duration-200 rounded-full p-1"
      >
        <span className="sr-only">Close</span>
        <X className="h-4 w-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b-xl overflow-hidden">
        <div
          className={cn(
            "h-full transition-all ease-linear",
            type === "success" ? "bg-emerald-500" : type === "error" ? "bg-rose-500" : "bg-amber-500",
          )}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ToastViewport = () => {
  return <div />
}

export const ToastTitle = () => {
  return <></>
}

export const ToastDescription = () => {
  return <></>
}

export const ToastClose = () => {
  return <></>
}

export const ToastAction = () => {
  return <></>
}
