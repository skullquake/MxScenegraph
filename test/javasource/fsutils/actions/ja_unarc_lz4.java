// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package fsutils.actions;

import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;
import com.mendix.systemwideinterfaces.core.IMendixObject;

public class ja_unarc_lz4 extends CustomJavaAction<java.util.List<IMendixObject>>
{
	private IMendixObject __obj_src;
	private system.proxies.FileDocument obj_src;
	private java.lang.String str_type;
	private java.lang.Boolean bool_txn;

	public ja_unarc_lz4(IContext context, IMendixObject obj_src, java.lang.String str_type, java.lang.Boolean bool_txn)
	{
		super(context);
		this.__obj_src = obj_src;
		this.str_type = str_type;
		this.bool_txn = bool_txn;
	}

	@java.lang.Override
	public java.util.List<IMendixObject> executeAction() throws Exception
	{
		this.obj_src = __obj_src == null ? null : system.proxies.FileDocument.initialize(getContext(), __obj_src);

		// BEGIN USER CODE
		return this.unlz4(
			obj_src.getMendixObject(),
			this.getContext(),
			bool_txn==null?true:bool_txn,
			str_type==null?"System.FileDocument":str_type
		);
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "ja_unarc_lz4";
	}

	// BEGIN EXTRA CODE
	private java.util.List<com.mendix.systemwideinterfaces.core.IMendixObject> unlz4(
		com.mendix.systemwideinterfaces.core.IMendixObject obj_filedocument,
		com.mendix.systemwideinterfaces.core.IContext ctx,
		java.lang.Boolean txn,
		java.lang.String objType
	){
	    java.util.List<com.mendix.systemwideinterfaces.core.IMendixObject> ret=new java.util.ArrayList<com.mendix.systemwideinterfaces.core.IMendixObject>();
	    txn=txn==null?false:txn;
	    com.mendix.systemwideinterfaces.core.IContext _ctx=ctx;
	    objType=objType==null?"System.FileDocument":objType;
	    try{
		java.io.InputStream is=com.mendix.core.Core.getFileDocumentContent(ctx, obj_filedocument);
		org.apache.commons.compress.compressors.lz4.FramedLZ4CompressorInputStream lz4is=new org.apache.commons.compress.compressors.lz4.FramedLZ4CompressorInputStream(is);
		if(txn)_ctx=ctx.getSession().createContext();
			if(txn)_ctx.startTransaction();
			com.mendix.systemwideinterfaces.core.IMendixObject o=com.mendix.core.Core.instantiate(_ctx,objType);
			o.setValue(_ctx,"Name",obj_filedocument.getValue(_ctx,"Name")+".uncompressed");
			com.mendix.core.Core.storeFileDocumentContent(_ctx,o,lz4is);
			if(txn)com.mendix.webui.FeedbackHelper.addRefreshObjectFeedback(_ctx,o.getId());
			if(txn)_ctx.endTransaction();
			lz4is.close(); 
			ret.add(o);
	    }catch(Exception e){
		com.mendix.core.Core.getLogger(this.toString()).error(e);
	    }
	    return ret;
	}
	// END EXTRA CODE
}
