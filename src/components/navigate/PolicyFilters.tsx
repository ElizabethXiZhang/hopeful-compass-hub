import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Filter } from "lucide-react";

interface PolicyFiltersProps {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  policyTypes: string[];
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export const PolicyFilters = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  policyTypes,
  selectedType,
  setSelectedType,
}: PolicyFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-4 md:p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Country Selector */}
        <div className="flex-1">
          <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Select Country
          </label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full bg-background/50 border-white/10">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10 z-50">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Policy Type Filter */}
        <div className="flex-1">
          <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Policy Type
          </label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full bg-background/50 border-white/10">
              <SelectValue placeholder="Select policy type" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10 z-50">
              {policyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};
