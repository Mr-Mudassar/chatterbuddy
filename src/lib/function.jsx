import { Badge } from "@/Components/ui/badge";

export const StatusComponent = (status) => {
  if (status) {
    return (
      <Badge className={"bg-green-200 rounded-full text-green-600"}>
        Active
      </Badge>
    );
  } else {
    return (
      <Badge className={"bg-purple-200 rounded-full text-purple-600"}>
        Inactive
      </Badge>
    );
  }
};
