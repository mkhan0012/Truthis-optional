// src/lib/engine.js

export async function generateRealities(input, intensity, isChaosMode) {
    try {
      const response = await fetch('/api/distort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, intensity, isChaosMode }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      // The API returns the exact structure our UI needs, 
      // but you can add frontend-specific fields (like IDs) here if needed.
      const distortions = data.distortions.map((d, i) => ({
        ...d,
        id: i.toString(), // Ensure unique ID for React keys
        color: getColorForType(d.type) // Helper to assign UI colors
      }));
  
      return {
        neutral: data.neutral,
        distortions: distortions
      };
  
    } catch (error) {
      console.error("Simulation Failed:", error);
      return null; 
    }
  }
  
  // Helper for UI styling
  function getColorForType(type) {
    const map = {
      Fear: "text-cyber-danger", // Red
      Optimistic: "text-cyber-success", // Green
      Corporate: "text-blue-400", // Blue
      Political: "text-cyber-purple", // Purple
      Cynical: "text-cyber-warning", // Yellow
    };
    return map[type] || "text-white";
  }