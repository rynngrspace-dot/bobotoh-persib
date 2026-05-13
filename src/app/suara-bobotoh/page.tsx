"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  name: string;
  text: string;
  location: string;
  created_at: string;
}

export default function SuaraBobotoh() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [location, setLocation] = useState("Bandung, Indonesia");
  const [isLocating, setIsLocating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Supabase Real-time Integration
  useEffect(() => {
    // 1. Fetch existing messages
    const fetchMessages = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('suara_bobotoh')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error fetching messages:", error);
      } else if (data) {
        setMessages(data);
      }
      setIsLoading(false);
    };

    fetchMessages();

    // 2. Subscribe to new messages
    const channel = supabase
      .channel('realtime_suara_bobotoh')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'suara_bobotoh' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    // 3. Detect location
    const detectLocation = async () => {
      setIsLocating(true);
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_name}`);
        }
      } catch (error) {
        console.error("Location detection failed:", error);
      } finally {
        setIsLocating(false);
      }
    };
    detectLocation();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    const currentText = inputText;
    setInputText(""); // Clear early for UX

    // Add a small 2s delay to make the loading effect feel more substantial
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { error } = await supabase
      .from('suara_bobotoh')
      .insert([
        {
          name: "Bobotoh",
          text: currentText,
          location: location,
        }
      ]);

    if (error) {
      console.error("Error sending message:", error);
      setInputText(currentText); // Restore if failed
    }
    
    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 selection:bg-persib-blue selection:text-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-persib-blue/50 bg-persib-blue/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            Tribune Digital Bobotoh
          </div>
          <h1 
            className="text-5xl sm:text-7xl text-white mb-4 uppercase"
            style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
          >
            Suara <span className="text-persib-blue">Bobotoh</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Sampaikan harapan, doa, dan pesan cinta untuk Persib Bandung.
          </p>
        </div>

        {/* Chat Container */}
        <div className="relative bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl h-[600px] flex flex-col">
          
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-persib-blue animate-spin" />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold animate-pulse">
                  Loading...
                </span>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-600 text-xs uppercase tracking-widest font-bold">
                Belum ada suara... Jadilah yang pertama!
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="group animate-fade-in"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-persib-blue/20 border border-persib-blue/30 flex items-center justify-center text-persib-blue font-bold text-xs">
                        B
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{msg.name}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin className="w-3 h-3" />
                          [{msg.location}]
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-600 uppercase font-medium">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="ml-11 bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl rounded-tl-none group-hover:border-persib-blue/30 transition-colors">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-900 border-t border-slate-800">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isSending}
                placeholder={isSending ? "Mengirim pesan..." : "Tulis harapan & doa untuk Persib..."}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-600 focus:border-persib-blue outline-none transition-all pr-14 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-persib-blue hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-persib-blue text-white rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-persib-blue/20"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
