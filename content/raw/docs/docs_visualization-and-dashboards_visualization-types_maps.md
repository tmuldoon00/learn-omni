# Maps

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/maps](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/maps)  
**Extracted:** 2025-07-23 21:45:02  
**Source:** Omni Analytics Documentation

---

On this page

Omni currently supports point and region map types.

Point maps

Data with latitude-longitude pairs can be visualized as a point map. Points can be sized and colored by additional

properties in the dataset.

Map with Color Pins

Map with Sized Pins:

Region maps

Data with region-based location information can be visualized as a region map. Omni offers region-based mappings

for countries and US states out of the box, and offers a custom region option for greater flexibility.

Built-in countries

Country region data can be mapped against your dataset by either country name, 2-digit country code or 3-digit

country code.

Dataset

Map

Built-in US States

US state region data can be mapped against your dataset by either name or 2-digit code.

Dataset

Map

Custom Regions

Omni allows you to specify your own region data via URL. You can specify an endpoint that returns region data

complying to either the

GeoJSON

TileJSON

specifications.

In order to use custom regions, you'll need to set your region type to "Custom" and then fill out the following fields:

Source type

- specify whether your region source is GeoJSON or TileJSON

Source URL

- the URL from which to load your GeoJSON or TileJSON data

Source layer

(TileJSON only) - the layer within the TileJSON specification you want to map against

Region property

- the property in the GeoJSON or TileJSON data that you want to map against

Dataset

Map

Projection types

Point and region maps support 2D (mercator) and 3D (globe) projections.

2D (Mercator)

3D (Globe)

Point maps also support heatmap projections:

Custom visualizations

More complex map visualizations can be unlocked using

advanced visualization

, including:

Static lat-long

Zip code maps

Other choropleth

(depending on the static map), or multi-layer maps (like points + regions).

Point maps

Region maps

Built-in countries

Built-in US States

Custom Regions

Projection types

Custom visualizations

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/maps](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/maps) on 2025-07-23.*
