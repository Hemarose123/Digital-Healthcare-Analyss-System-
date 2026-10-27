import re

path = 'c:/Users/hemar/Downloads/ai-health-companion/src/frontend/src/pages/Diet.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add fiber to MealNutrition
content = content.replace('fat: number;', 'fat: number;\n  fiber: number;')

# Add fiber to MEALS array
def replacer(match):
    # carbs is group 2
    return match.group(0) + ', fiber: ' + str(max(3, int(match.group(2)) // 8))

content = re.sub(r'(nutrition:\s*\{\s*calories:\s*\d+,\s*protein:\s*\d+,\s*carbs:\s*(\d+),\s*fat:\s*\d+)', replacer, content)

tips_section = """
      {/* Dietary Tips & Foods to Avoid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-5">
          <h3 className="text-red-600 dark:text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
            <span className="text-lg">🚫</span> Foods to Avoid (PCOS / Weight Loss)
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-red-400">•</span> Refined carbohydrates (white bread, pastries)</li>
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-red-400">•</span> Sugary snacks and sweetened beverages</li>
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-red-400">•</span> Processed meats and deep-fried foods</li>
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-red-400">•</span> High-glycemic index foods</li>
          </ul>
        </div>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-5">
          <h3 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
            <span className="text-lg">💡</span> Dietary Tips for You
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-400">✓</span> Increase fiber intake (vegetables, legumes)</li>
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-400">✓</span> Add lean protein to every meal to balance blood sugar</li>
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-400">✓</span> Include anti-inflammatory foods (turmeric, omega-3s)</li>
            <li className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-400">✓</span> Stay hydrated! Drink at least 2.5L of water daily</li>
          </ul>
        </div>
      </motion.div>
"""

content = content.replace('{/* Meals Grid */}', tips_section + '\n      {/* Meals Grid */}')

content = content.replace(
    '{ name: "Fat", value: selectedMeal.nutrition.fat },',
    '{ name: "Fat", value: selectedMeal.nutrition.fat },\n        { name: "Fiber", value: selectedMeal.nutrition.fiber },'
)

content = content.replace(
    '{ label: "Fat", value: meal.nutrition.fat, unit: "g" },',
    '{ label: "Fat", value: meal.nutrition.fat, unit: "g" },\n                        { label: "Fiber", value: meal.nutrition.fiber, unit: "g" },'
)

content = content.replace('grid grid-cols-4 gap-1', 'grid grid-cols-5 gap-1')

# The exact match is tricky because of formatting. I will use regex to find the Fat label block and append Fiber block.
replacement_fiber_block = r'''label: "Fat",
                          value: `${selectedMeal.nutrition.fat}g`,
                          color: MACRO_COLORS[2],
                        },
                        {
                          label: "Fiber",
                          value: `${selectedMeal.nutrition.fiber}g`,
                          color: MACRO_COLORS[3] || "#a855f7",
                        },'''

content = re.sub(r'label:\s*"Fat",\s*value:\s*`\$\{selectedMeal\.nutrition\.fat\}g`,\s*color:\s*MACRO_COLORS\[2\],\s*\},', replacement_fiber_block, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Diet updated successfully!')
