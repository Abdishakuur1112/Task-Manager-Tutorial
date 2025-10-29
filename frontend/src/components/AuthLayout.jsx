import React from "react"

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
