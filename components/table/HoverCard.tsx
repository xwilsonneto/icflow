import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  
  interface CellHoverCardProps {
    newValue: number
    changeValue: number
  }
  
  const CellHoverCard: React.FC<CellHoverCardProps> = ({ newValue, changeValue }) => {
    const isIncrease = changeValue > 0 // Check if there was an increase
    const isDecrease = changeValue < 0 // Check if there was a decrease
  
    return (
      <div className="min-w-[64px]">
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex justify-center items-center gap-1">
              <p className="text-14-medium text-purple-1">{newValue}</p>
            </div>
          </HoverCardTrigger>
          {changeValue !== 0 && (
            <HoverCardContent className="bg-light-200 text-purple-1">
              <p className="text-14-medium">
                {isIncrease 
                  ? `Aumento de: ${changeValue} itens.` 
                  : `Diminuição de: ${Math.abs(changeValue)} itens.`}
              </p>
            </HoverCardContent>
          )}
        </HoverCard>
      </div>
    )
  }
  
  export default CellHoverCard
  