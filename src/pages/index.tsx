import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStats(null);
    try {
      const response = await fetch(`/api/stats?username=${username}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stats");
      }

      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 ${inter.className}`}
    >
      <style jsx global> {`
       @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .text_header_anim {
    -webkit-animation:name 2s infinite;
}

@keyframes name {
    0% {color:magenta;}
    50% {color:blue;}
    100%{color:green}
}

  .animate-fade-in {
    animation: fade-in 1.5s ease-out forwards;
  }
        /* Modern scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(9, 122, 139, 0.5),
            rgba(65, 185, 122, 0.5)
          );
          border-radius: 8px;
          border: 2px solid rgba(15, 23, 42, 0.1);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(9, 122, 139, 0.5),
            rgba(65, 185, 122, 0.5)
          );
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(214, 188, 250, 0.5) rgba(15, 23, 42, 0.1);
        }
      `}</style>

      {/* Subtle Pattern Overlay */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Header */}
      <header className="border-b border-yellow-300 backdrop-blur-sm bg-yellow-400 sticky top-0 z-50 py-2 flex items-center justify-center">
        <div>
          <h1 className="text_header_anim text-2xl font-bold"> Meme Coin API</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 py-12 flex justify-center">
        <div className="w-1/2">
          <div className="flex-col gap-8">
            {/* Left Column - Input Form */}
            <div className="flex justify-center">
              <Image
                src="https://ph-files.imgix.net/8f799c72-b5f2-48c5-a134-143281cc0502.vnd.microsoft.icon"
                alt="Git Wrapped Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <div className="md:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-300"
                  >
                    Wallet address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none placeholder-gray-500 backdrop-blur-sm"
                      placeholder="Enter your Wallet Address"
                      required
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg blur opacity-20"></div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-600 hover:to-green-600 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Check now!"
                  )}
                </button>
                <div className="flex justify-center">
                  <h1 className="text-2xl font-bold animate-fade-in py-24">Check the statistics of all your meme coins!</h1>
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
