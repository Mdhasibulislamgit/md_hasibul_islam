
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { ContactMessage } from '@/types';
import { getContactMessages, deleteContactMessage } from "@/actions/contactActions";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const fetchedMessages = await getContactMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast({ title: "Error", description: "Could not load messages.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteContactMessage(id);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        fetchMessages(); // Refresh the list
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Messages</CardTitle>
          <CardDescription>View messages submitted through your portfolio's contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <Card key={msg.id} className="bg-card hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{msg.name}</CardTitle>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(msg.submittedAt).toLocaleString()}
                        </span>
                    </div>
                    <CardDescription className="text-sm">{msg.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(msg.id)}
                      disabled={isPending}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No messages received yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
