import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Rectangle
from matplotlib.lines import Line2D

# Create figure
fig, ax = plt.subplots(figsize=(8,4))
ax.set_xlim(0, 800)
ax.set_ylim(0, 400)
ax.axis('off')

# Colors
church_color = '#8B4513'   # brown
obelisk_color = '#FFD700'  # gold
tech_color = '#1E90FF'     # blue accent for tech

# Draw Lalibela stylized church (left)
church_roof = Polygon([[100,200],[140,300],[180,200]], closed=True, color=church_color)
church_base = Rectangle((130,100),20,100, color=church_color)
ax.add_patch(church_roof)
ax.add_patch(church_base)

# Draw Axum stylized obelisk (right)
obelisk = Polygon([[600,100],[610,300],[620,100]], closed=True, color=obelisk_color)
ax.add_patch(obelisk)

# Draw tech-style connecting line
ax.add_line(Line2D([200,580],[220,220], color=tech_color, linewidth=3, linestyle='--'))

# Add text
ax.text(200, 250, "laliAx et solution IGHC", fontsize=24, fontweight='bold', color='black')

# Save & show
plt.savefig("laliAx_best_logo.png", dpi=300, bbox_inches='tight')
plt.show()
