import { Upload } from "lucide-react"
 
import { Button } from "@/components/ui/button"


export function ButtonWithIcon() {

  return (
    <Button
        onClick={handleClick}
    >
      <Upload className="mr-2 h-4 w-4" /> Upload your csv
    </Button>
  )
}