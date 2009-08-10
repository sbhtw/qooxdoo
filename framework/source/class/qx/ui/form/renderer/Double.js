/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * <h3>EXPERIMENTAL!</h3>
 *
 * Double column rendere for {@link qx.ui.form.Form}.
 */
qx.Class.define("qx.ui.form.renderer.Double", 
{
  extend : qx.ui.core.Widget,
  implement : qx.ui.form.renderer.IFormRenderer,

  construct : function()
  {
    this.base(arguments);
    
    var layout = new qx.ui.layout.Grid();
    layout.setSpacing(6);
    layout.setColumnAlign(0, "left", "top");
    layout.setColumnAlign(1, "left", "top");    
    layout.setColumnAlign(2, "left", "top");
    layout.setColumnAlign(3, "left", "top");        
    this._setLayout(layout);
  },
  

  members :
  {
    _row : 0,
    _buttonRow : null,
    
    /**
     * Add a group of form items with the corresponding names. The names are
     * displayed as label.
     * The title is optional and is used as grouping for the given form 
     * items.
     * 
     * @param items {qx.ui.core.Widget[]} An array of form items to render.
     * @param names {String[]} An array of names for the form items.
     * @param title {String?} A title of the group you are adding.
     */
    addItems : function(items, names, title) {
      // add the header
      if (title != null) {
        this._add(
          this._createHeader(title), {row: this._row, column: 0, colSpan: 4}
        );
        this._row++;
      }
      
      // add the items
      for (var i = 0; i < items.length; i++) {
        var label = this._createLabel(names[i], items[i]);
        this._add(label, {row: this._row, column: (i * 2) % 4});
        var item = items[i];
        if (item instanceof qx.ui.form.RadioGroup) {
          item = this._createWidgetForRadioGroup(item);
        }
        this._add(item, {row: this._row, column: ((i * 2) % 4) + 1});
        if (i % 2 == 1) {  
          this._row++;
        }
      }
      
      if (i % 2 == 1) {
        this._row++;        
      }
    },
    
    /**
     * Adds a button the form renderer. All buttons will be added in a 
     * single row at the bottom of the form.
     * 
     * @param button {qx.ui.form.Button} The button to add.
     */
    addButton : function(button) {
      if (this._buttonRow == null) {
        // create button row
        this._buttonRow = new qx.ui.container.Composite();
        this._buttonRow.setMarginTop(5);
        var hbox = new qx.ui.layout.HBox();
        hbox.setAlignX("right");
        hbox.setSpacing(5);
        this._buttonRow.setLayout(hbox);
        // add the button row
        this._add(this._buttonRow, {row: this._row, column: 0, colSpan: 4});
        // increase the row
        this._row++;
      } 
      
      // add the button
      this._buttonRow.add(button);      
    },
      
    
    /**
     * Creates a label for the given form item.
     *  
     * @param name {String} The content of the label without the 
     *   trailing * and :
     * @param item {qx.ui.core.Widget} The item, which has the required state.
     * @return {qx.uiu.basic.Label} The label for the given item.
     */
    _createLabel : function(name, item) {
      var required = "";
      if (item.getRequired()) {
       required = " <span style='color:red'>*</span> "; 
      }
      var label =  new qx.ui.basic.Label(name + required + " :");
      label.setRich(true);
      return label;
    },
    
    
    /**
     * Creates a header label for the form groups.
     * 
     * @param title {String} Creates a header label.
     * @return {qx.ui.basic.Label} The header for the form groups.
     */
    _createHeader : function(title) {
      var header = new qx.ui.basic.Label(title);
      header.setFont("bold");
      if (this._row != 0) {
        header.setMarginTop(10);        
      }      
      return header;
    },
    
    
    /**
     * Takes the items of the given RadioGroup and adds the to a Composite. 
     * The composite has a VBox layout so the RadioButtons will be alligned
     * vertically.
     * 
     * @param group {qx.ui.form.RadioGroup} The RadioGroup which needs to be 
     *   added.
     * @return {qx.ui.container.Composite} A composite containing the items of 
     *   the RadioGroup.
     */
    _createWidgetForRadioGroup : function(group) {
      var widget = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      var items = group.getItems();
      for (var i = 0; i < items.length; i++) {
        widget.add(items[i]);
      }
      return widget;
    }
  }
});
