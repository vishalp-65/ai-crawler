import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user_context";
import axios from "axios";
import toast from "react-hot-toast";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserModal({ isOpen, onClose }: IModalProps) {
    const { user, fetchUserData } = useUser();
    const [name, setName] = useState<string>(user?.name || "");
    const [age, setAge] = useState<number>(user?.age || 0);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const handleSaveChanges = async () => {
        if (!name || !age) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsSaving(true);

        try {
            await axios.put("/api/user/update", {
                email: user?.email,
                name,
                age,
            });

            toast.success("Profile updated successfully.");
            fetchUserData(); // Refresh user data
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update user:", error);
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you
                        are done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="age" className="text-right">
                            Your Age
                        </Label>
                        <Input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="dark:text-white"
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
