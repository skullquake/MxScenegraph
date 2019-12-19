// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package scenegraph.actions;

import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;
import com.mendix.systemwideinterfaces.core.IMendixObject;

public class ja_str2filedocument extends CustomJavaAction<java.lang.Boolean>
{
	private java.lang.String str_str;
	private IMendixObject __obj_filedocument;
	private system.proxies.FileDocument obj_filedocument;

	public ja_str2filedocument(IContext context, java.lang.String str_str, IMendixObject obj_filedocument)
	{
		super(context);
		this.str_str = str_str;
		this.__obj_filedocument = obj_filedocument;
	}

	@java.lang.Override
	public java.lang.Boolean executeAction() throws Exception
	{
		this.obj_filedocument = __obj_filedocument == null ? null : system.proxies.FileDocument.initialize(getContext(), __obj_filedocument);

		// BEGIN USER CODE
                try (
			java.io.InputStream is=org.apache.commons.io.IOUtils.toInputStream(str_str,java.nio.charset.StandardCharsets.UTF_8)

                ){
                        com.mendix.core.Core.storeFileDocumentContent(
				this.getContext(),
				obj_filedocument.getMendixObject(),
				is
			);
                }catch(java.lang.Exception e){
			com.mendix.core.Core.getLogger(this.toString()).error(e.toString());
			return false;
		}
		return true;

		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "ja_str2filedocument";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
