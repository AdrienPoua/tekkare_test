import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useCurrency from "../../hooks/useCurrency";
import { Euro, DollarSign } from "lucide-react";

/**
 * ToggleButton: Switches between EUR and USD currency with icons for visual representation.
 * It uses a custom `useCurrency` hook to handle the state of the current currency.
 */
export default function ToggleButton() {
  const { currency, setCurrency } = useCurrency();

  const handleCurrency = () => {
    setCurrency((prev) => (prev === 'eur' ? 'usd' : 'eur'));
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Euro Label */}
      <Label
        htmlFor="currency-toggle"
        className={`font-bold text-xl flex items-center gap-2 ${currency === 'eur' ? 'text-accent' : 'text-text'}`}
      >
        <Euro />
      </Label>

      {/* Switch between EUR and USD */}
      <Switch
        id="currency-toggle"
        checked={currency === 'usd'}
        onCheckedChange={handleCurrency}
        className="bg-text"
      />

      {/* Dollar Label */}
      <Label
        htmlFor="currency-toggle"
        className={`font-bold text-xl flex items-center gap-2 ${currency === 'usd' ? 'text-accent' : 'text-text'}`}
      >
        <DollarSign />
      </Label>
    </div>
  );
}
