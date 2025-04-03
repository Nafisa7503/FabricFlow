
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Order } from '@/types/orderTypes';

interface CustomerMessagingProps {
  orders: Order[];
}

const CustomerMessaging = ({ orders }: CustomerMessagingProps) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Order | null>(null);

  const handleSearchCustomer = () => {
    if (!phoneNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a phone number",
      });
      return;
    }

    const foundOrder = orders.find((order) => 
      order.customer.phone.replace(/\s+/g, '').includes(phoneNumber.replace(/\s+/g, ''))
    );

    if (foundOrder) {
      setSelectedCustomer(foundOrder);
      // Prepare default message template
      setMessage(
        `Dear ${foundOrder.customer.name},\n\nYour order ${foundOrder.id} is ${foundOrder.status.toLowerCase()}. Please contact us for more details.\n\nRegards,\nTailoring Shop`
      );
    } else {
      toast({
        variant: "destructive",
        title: "Customer Not Found",
        description: "No customer found with this phone number",
      });
      setSelectedCustomer(null);
    }
  };

  const handleSendMessage = () => {
    if (!selectedCustomer) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a customer first",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message",
      });
      return;
    }

    // In a real app, this would send the message via an API
    console.log("Sending message to:", selectedCustomer.customer.phone);
    console.log("Message:", message);

    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedCustomer.customer.name}`,
    });

    // Reset form
    setPhoneNumber('');
    setMessage('');
    setSelectedCustomer(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Customer Messaging</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button onClick={handleSearchCustomer}>Search</Button>
        </div>

        {selectedCustomer && (
          <div className="space-y-4">
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="font-medium">{selectedCustomer.customer.name}</p>
              <p className="text-sm">{selectedCustomer.customer.phone}</p>
              <p className="text-sm mt-1">
                Last Order: {selectedCustomer.id} ({selectedCustomer.status})
              </p>
            </div>

            <Textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />

            <Button onClick={handleSendMessage} className="w-full">
              Send Message
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerMessaging;
