import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PolicyCard } from "./PolicyCard";
import { PolicyFilters } from "./PolicyFilters";
import { AlertCircle, Loader2, FileSearch } from "lucide-react";

interface GovernmentPolicy {
  id: string;
  country: string;
  policy_type: string;
  title: string;
  source_url: string;
  ai_summary: string | null;
  last_verified: string;
  created_at: string;
}

const POLICY_TYPES = [
  "All Types",
  "Financial Support",
  "Reskilling / Education",
  "Welfare / Social Safety Nets",
  "AI & Automation Policies",
];

export const GovernmentPoliciesSection = () => {
  const [policies, setPolicies] = useState<GovernmentPolicy[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("All Countries");
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch unique countries
  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase
        .from("government_policies")
        .select("country")
        .order("country");

      if (error) {
        console.error("Error fetching countries:", error);
        return;
      }

      const uniqueCountries = [...new Set(data?.map((d) => d.country) || [])];
      setCountries(["All Countries", ...uniqueCountries]);
    };

    fetchCountries();
  }, []);

  // Fetch policies based on filters
  useEffect(() => {
    const fetchPolicies = async () => {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from("government_policies")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedCountry !== "All Countries") {
        query = query.eq("country", selectedCountry);
      }

      if (selectedType !== "All Types") {
        query = query.eq("policy_type", selectedType);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching policies:", error);
        setError("Failed to load policies. Please try again.");
        setIsLoading(false);
        return;
      }

      setPolicies(data || []);
      setIsLoading(false);
    };

    fetchPolicies();
  }, [selectedCountry, selectedType]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Government Policies & Support
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore official support programs, reskilling initiatives, and social safety nets 
            available in your country to help navigate job transitions.
          </p>
        </motion.div>

        {/* Filters */}
        <PolicyFilters
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          policyTypes={POLICY_TYPES}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : policies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <FileSearch className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Policies Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're actively adding verified government policies. Check back soon or try adjusting your filters.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy, index) => (
              <PolicyCard key={policy.id} policy={policy} index={index} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto">
            <AlertCircle className="w-3 h-3 inline-block mr-1" />
            For awareness purposes only. Please verify details on the official source. 
            This information does not constitute legal or financial advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
