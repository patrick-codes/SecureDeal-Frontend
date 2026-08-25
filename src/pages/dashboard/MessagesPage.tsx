import { Paperclip, SendHorizonal, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

const initialMessages = [
  {
    sender: "System",
    text: "Buyer has secured payment.",
    time: "09:14 AM",
    tone: "system",
  },
  {
    sender: "Seller",
    text: "The item has been packed and is ready for courier pickup.",
    time: "09:21 AM",
    tone: "other",
  },
  {
    sender: "You",
    text: "Please share the tracking number once it is dispatched.",
    time: "09:26 AM",
    tone: "self",
  },
  {
    sender: "System",
    text: "Seller marked the item as shipped.",
    time: "09:32 AM",
    tone: "system",
  },
];

export default function MessagesPage() {
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setIsSending(true);
    setToast(null);

    window.setTimeout(() => {
      setChatMessages((value) => [
        ...value,
        {
          sender: "You",
          text: input.trim(),
          time: "Just now",
          tone: "self",
        },
      ]);
      setInput("");
      setIsSending(false);
      setToast("Message sent to the transaction chat.");
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">MacBook Pro</h1>
          <p className="mt-2 text-textSecondary">Transaction #SD-82931</p>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-border bg-slate-50 px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-textPrimary">
                Transaction conversation
              </div>
              <div className="text-sm text-textSecondary">
                Protected and monitored
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-white p-5">
            {chatMessages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex ${message.tone === "self" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.tone === "system" ? "bg-primary text-white" : message.tone === "self" ? "bg-softGreen text-textPrimary" : "bg-slate-100 text-textPrimary"}`}
                >
                  <div className="mb-1 font-medium">{message.sender}</div>
                  <div>{message.text}</div>
                  <div
                    className={`mt-2 text-[10px] ${message.tone === "system" ? "text-white/80" : "text-textSecondary"}`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={() =>
                setToast("Attachment selected and ready to send.")
              }
            />
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-slate-50 p-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                className="flex-1 border-none bg-transparent text-sm outline-none"
                placeholder="Write a message..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white disabled:opacity-60"
                onClick={sendMessage}
                disabled={isSending || !input.trim()}
              >
                {isSending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizonal className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </Card>
      </div>
      <Toast
        show={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
        tone="info"
      />
    </DashboardLayout>
  );
}
