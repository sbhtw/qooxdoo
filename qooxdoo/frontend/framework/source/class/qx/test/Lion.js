qx.Clazz.define("qx.test.Lion",
{
  extend : qx.test.Cat,


  /**
   * TODOC
   *
   * @type constructor
   */
  construct : function() {
    arguments.callee.base.call(this);
  },

  include : [ qx.test.MFat ],

  properties :
  {
    color :
    {
      _legacy      : true,
      type         : "string",
      defaultValue : "yellow"
    }
  },

  members :
  {
    /** {var} TODOC */
    name : "LionName",


    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    makeSound : function() {
      this.debug("WOOOOOAAAAAHH!!!");
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    play : function() {
      arguments.callee.base.call(this);
    }
  }
});
