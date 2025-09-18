import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="relative w-48 h-48">
        {/* Círculo principal rotando */}
        <div className="absolute inset-0 rounded-full border-6 border-blue-500 border-t-transparent animate-spin"></div>

        {/* Figuras geométricas flotantes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Triángulo */}
          <div
            className="absolute w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-500 animate-bounce"
            style={{
              top: "10%",
              left: "20%",
              animationDelay: "0s",
              animationDuration: "2s",
            }}
          ></div>

          {/* Cuadrado */}
          <div
            className="absolute w-6 h-6 bg-green-500 rotate-45 animate-pulse"
            style={{
              top: "70%",
              right: "15%",
              animationDelay: "0.5s",
              animationDuration: "1.5s",
            }}
          ></div>

          {/* Círculo pequeño */}
          <div
            className="absolute w-4 h-4 bg-yellow-500 rounded-full animate-ping"
            style={{
              bottom: "20%",
              left: "10%",
              animationDelay: "1s",
              animationDuration: "2.5s",
            }}
          ></div>

          {/* Hexágono */}
          <div
            className="absolute w-7 h-7 bg-purple-500 animate-bounce"
            style={{
              top: "15%",
              right: "25%",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              animationDelay: "1.5s",
              animationDuration: "3s",
            }}
          ></div>

          {/* Rombo */}
          <div
            className="absolute w-6 h-6 bg-orange-500 rotate-45 animate-pulse"
            style={{
              bottom: "25%",
              right: "20%",
              animationDelay: "2s",
              animationDuration: "1.8s",
            }}
          ></div>

          {/* Círculo mediano */}
          <div
            className="absolute w-8 h-8 bg-teal-500 rounded-full animate-ping"
            style={{
              top: "60%",
              left: "25%",
              animationDelay: "0.3s",
              animationDuration: "2.2s",
            }}
          ></div>
        </div>

        {/* Anillo exterior pulsante */}
        <div
          className="absolute inset-0 rounded-full border-3 border-indigo-300 animate-ping opacity-75"
          style={{
            animationDuration: "3s",
            transform: "scale(1.2)",
          }}
        ></div>

        {/* Puntos orbitales */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }}>
          <div
            className="absolute w-3 h-3 bg-pink-500 rounded-full"
            style={{ top: "-6px", left: "50%", transform: "translateX(-50%)" }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-cyan-500 rounded-full"
            style={{ bottom: "-6px", left: "50%", transform: "translateX(-50%)" }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-lime-500 rounded-full"
            style={{ top: "50%", left: "-6px", transform: "translateY(-50%)" }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-amber-500 rounded-full"
            style={{ top: "50%", right: "-6px", transform: "translateY(-50%)" }}
          ></div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-6 text-center font-medium">Descargando recursos...</p>
      </div>
    </div>
  )
}