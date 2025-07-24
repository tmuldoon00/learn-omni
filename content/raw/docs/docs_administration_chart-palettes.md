# Chart palettes

**Source URL:** [https://docs.omni.co/docs/administration/chart-palettes](https://docs.omni.co/docs/administration/chart-palettes)  
**Extracted:** 2025-07-23 21:43:43  
**Source:** Omni Analytics Documentation

---

On this page

Using pre-defined color palettes allow you to quickly apply consistent color treatment to charts across workbooks and dashboards. A variety of discrete and continuous palettes are provided for you that cover a wide range of use cases. Administrators can create additional custom palettes of either type for easier customization and consistency.

Chart palettes are currently only accessible in the X/Y style charts (bar, scatter, line, etc.) and not yet available in conditional formatting for tables visualizations.

Custom palettes

Adding

Add as many additional custom palettes as your organization needs. Click the

Add

button at the top of the palette list. Customize by adding, editing and removing colors. Use the color picker control or select

Open hex code editor

and paste in a list of comma-separated hex codes.

In the Chart Palettes settings page, custom palettes can be identified by an asterisk by their name.

Custom palettes will be listed in the chart editor palette picker in alphabetical order before any of the Omni-provided palettes.

Deleting

To delete a custom palette, click the

Options

icon next to the palette and select

Delete

. If you delete a palette that an existing chart is using, the chart will be updated to use the organization's default palette.

You can not delete any of the Omni-provided color palettes.

Editing

To modify a custom palette, click the

Options

icon next to the palette and select

Edit

. Make your modifications and click

Save

. Existing charts using the palette will be updated with the modifications.

You can not edit any of the Omni-provided color palettes.

Default palettes

The default palette will be the initial set of colors applied to any new chart, automatically using the discrete or continuous palette based on the chart type and data.

Admins can change the default palette by clicking the

Options

icon for the palette they would like to select and choosing

Set as default

. Existing charts using the default color palettes will be updated to the new default.

Omni-provided or custom palettes can be set to the default. You can identify the default palette in

Settings > Chart Palettes

by the blue badge next to the name.

The default palette can not be deleted until another palette has been set as the default.

Using palettes in visualizations

Chart palettes are currently only used for color faceting. You can access the chart palettes from the

Options

panel in the

Color > Options

popup. Any custom palettes created for the organization will appear in the list before the Omni-provided palettes.

For more on using palettes in visualizations, see the

Color by / Stacking documentation

Color references

The color values for the Omni-specific palettes are provided below as a reference for creating your own palette variations. For all other palettes, refer to the

Vega Scheme Reference

Omni discrete palettes

Omni

#298BE5, // blue

#F7B54E, // yellow

#FF6291, // pink

#1DB9B9, // teal

#FF8515, // orange

#3D923B, // green

#4D59E2, // purple

#E43030, // red

#97A345, // olive

#BE43C0, // magenta

#94C5F7, // blue --- lighter

#F6E692, // yellow

#FF9EC8, // pink

#96F1F3, // teal

#FFC28A, // orange

#97D087, // green

#A5ABF8, // purple

#F08A8A, // red

#C1CA82, // olive

#DFA3E0, // magenta

#025DB1, // blue --- darker

#D7870A, // yellow

#E11955, // pink

#1C8787, // teal

#B85800, // orange

#296228, // green

#2530B6, // purple

#AB1616, // red

#6E7632, // olive

#752877, // magenta

Omni pairs

#94C5F7, // blue

#298BE5,

#F6E692, // yellow

#F7B54E,

#FF9EC8, // pink

#FF6291,

#96F1F3, // teal

#1DB9B9,

#FFC28A, // orange

#FF8515,

#97D087, // green

#3D923B,

#A5ABF8, // purple

#4D59E2,

#F08A8A, // red

#E43030,

#C1CA82, // olive

#97A345,

#DFA3E0, // magenta

#BE43C0

Omni threes

#94C5F7, // blue

#298BE5,

#025DB1,

#F6E692, // yellow

#F7B54E,

#D7870A,

#FF9EC8, // pink

#FF6291,

#E11955,

#96F1F3, // teal

#1DB9B9,

#1C8787,

#FFC28A, // orange

#FF8515,

#B85800,

#97D087, // green

#3D923B,

#296228,

#A5ABF8, // purple

#4D59E2,

#2530B6,

#F08A8A, // red

#E43030,

#AB1616,

#C1CA82, // olive

#97A345,

#6E7632,

#DFA3E0, // magenta

#BE43C0,

#752877

Omni fours

#94C5F7, // blue

#298BE5,

#025DB1,

#013A6F,

#97D087, // green

#3D923B,

#296228,

#183A17

#DFA3E0, // magenta

#BE43C0,

#752877,

#4B1A4C,

#96F1F3, // teal

#1DB9B9,

#1C8787,

#135D5D,

#FF9EC8, // pink

#FF6291,

#E11955,

#971139

Omni ordered

#1DB9B9, // teal

#298BE5, // blue

#4D59E2, // purple

#BE43C0, // magenta

#FF6291, // pink

#E43030, // red

#FF8515, // orange

#F7B54E, // yellow

#9BA345, // olive

#3D923B // green

Omni ordered pairs

#96F1F3, // teal

#1DB9B9,

#94C5F7, // blue

#298BE5,

#A5ABF8, // purple

#4D59E2,

#DFA3E0, // magenta

#BE43C0,

#FF9EC8, // pink

#FF6291,

#F08A8A, // red

#E43030,

#FFC28A, // orange

#FF8515,

#F6E692, // yellow

#F7B54E,

#CBD397, // olive

#9BA345,

#97D087, // green

#3D923B

Omni ordered threes

#96F1F3, // teal

#1DB9B9,

#1C8787,

#94C5F7, // blue

#298BE5,

#025DB1,

#A5ABF8, // purple

#4D59E2,

#2530B6,

#DFA3E0, // magenta

#BE43C0,

#752877,

#FF9EC8, // pink

#FF6291,

#E11955,

#F08A8A, // red

#E43030,

#AB1616,

#FFC28A, // orange

#FF8515,

#B85800,

#F6E692, // yellow

#F7B54E,

#D7870A,

#C1CA82, // olive

#97A345,

#6E7632,

#97D087, // green

#3D923B,

#296228

Omni ordered fours

#96F1F3, // teal

#1DB9B9,

#1C8787,

#135D5D,

#94C5F7, // blue

#298BE5,

#025DB1,

#013A6F,

#DFA3E0, // magenta

#BE43C0,

#752877,

#4B1A4C,

#FF9EC8, // pink

#FF6291,

#E11955,

#971139,

#97D087, // green

#3D923B,

#296228,

#183A17

Omni red green

#E43030, #3D923B

Omni red yellow green

#E43030, #F7B54E, #3D923B

Omni continuous palettes

Omni blues

#D6E9FA, #298BE5, #013A6F

Omni greens

#D6ECCF, #3D923B, #183A17

Omni red yellow green

#E43030, #F6E692, #3D923B

Custom palettes

Adding

Deleting

Editing

Default palettes

Using palettes in visualizations

Color references

Omni discrete palettes

Omni continuous palettes

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/chart-palettes](https://docs.omni.co/docs/administration/chart-palettes) on 2025-07-23.*
