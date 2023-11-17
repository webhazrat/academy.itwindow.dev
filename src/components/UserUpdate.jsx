import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import { useForm, Controller } from "react-hook-form";
import Label from "./Label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";

export default function UserUpdate({ user, setUser, mutate }) {
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      role: user.role,
      status: user.status,
    },
  });

  const handleUserUpdate = async (data) => {
    try {
      const response = await fetch(`/api/users/update?id=${user._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updateResponse = await response.json();
      if (response.ok) {
        toast({
          variant: "success",
          title: updateResponse.title,
          description: updateResponse.message,
        });
        mutate();
        reset();
        setUser(null);
        clearErrors();
      }
    } catch (error) {
      console.log({ userUpdateCatch: error });
    }
  };

  return (
    <Dialog open={user} onOpenChange={setUser}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>ইউজার আপডেট</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUserUpdate)}>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="role">রোল</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user.role}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.role && (
                <p className="text-sm text-red-400">{errors.role.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">স্ট্যাটাস</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Verified">Varified</SelectItem>
                        <SelectItem value="Unverified">Unverified</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red-400">{errors.status.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient text-white"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                )}
                আপডেট করুন
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
