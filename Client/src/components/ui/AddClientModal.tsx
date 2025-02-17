import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Info } from 'lucide-react';

const AddClientModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    permission: 'limited'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <span className="text-blue-600 text-xl">👥</span>
            Add Client
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Client Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@acme.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Acme"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Set Permissions</Label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            
            <RadioGroup
              value={formData.permission}
              onValueChange={(value) => handleChange({ target: { name: 'permission', value } })}
              className="space-y-2"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="full" id="full" />
                <div className="grid gap-1.5">
                  <Label htmlFor="full" className="font-medium">Full access</Label>
                  <p className="text-sm text-gray-500">Edit sequences, manage prospects, send replies, add templates.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="limited" id="limited" />
                <div className="grid gap-1.5">
                  <Label htmlFor="limited" className="font-medium">Limited access</Label>
                  <p className="text-sm text-gray-500">View sequences, get reports, send replies, connect mailboxes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="none" id="none" />
                <div className="grid gap-1.5">
                  <Label htmlFor="none" className="font-medium">No access</Label>
                  <p className="text-sm text-gray-500">Do not give permission to login, Generate password later.</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;