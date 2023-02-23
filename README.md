# Sadmin figma plugin

https://sadmin.tarucy.net/  

Sadmin is an Administrator UI Template that utilizes the components of svelte.  
Features include built-in components for easy customization.  
This plugin was created to quickly draw and annotate Sadmin's screens and automatically extract html code.

# How to use
Search for "sadmin" in the Figma plugin and run it.  
The components of the sadmin plugin are loaded from the _component page.  
They are not embedded within the plugin for easy customization.  
For use in one project only, simply rename the open file.
To use it in multiple projects, rename or duplicate the open file.

## How to draw WireFrame
1. Add a page.
2. Select the `article` Frame for the added page.
3. Add a Grid or Border Box.
4. Select a frame that begins with `is-` within the `columns` frame.<br>Components or tables can only be added to frames that begin with `is-`. 
5. Add a Component or Table.<br>The properties of a component can usually be changed in the `Design tab` of Figma.<br>You can select the added table frame to add more columns and rows.<br>If you want to put a component in the `th` or `td`, you can select it and right-click to run `Detach Instance` and remove the text before putting it in.

## How to add Description
1. Select the Frame or Component you want to describe.
2. Enter the month text and description text for the marker, select a color for the marker, and add the marker.
3. Select the Frame or Component to which the marker is added to view and edit the contents of the marker.
4. You can also modify the description directly in the description area on the right side of the page.

## How to Export
1. Select the `article` frame.
2. click the Export button.
3. Paste the generated code into sadmin's page.

## How to Components customization
The `sadmin` has embedded components for quick customization, and the figma plugin likewise has embedded components on the `_component` page.

### _page, _page_mo
In WireFrame, you can customize the PC and mobile screens that are added. The only rule is that the `article` frame must exist and be set to autolayout vertical orientation.

### _layout, _layout_mo
If you want to modify the top or left menu while maintaining the Gnb, Lnb, etc. structure, you can customize those frames. The customized Gnb and Lnb will be automatically applied to `_page` and `_page_mo`.

### _component, component base
You can modify the defaulted components in that frame. Modifying the font, color, size, etc. will work right away.
If you want to add a new component, you'll need to modify the Pygma plugin to implement the functionality for that component. If you don't see your favorite component, feel free to make a request. 😗

EOD  