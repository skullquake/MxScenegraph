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

public class ja_arc_deflate64 extends CustomJavaAction<java.lang.Boolean>
{
	private IMendixObject __obj_src;
	private system.proxies.FileDocument obj_src;

	public ja_arc_deflate64(IContext context, IMendixObject obj_src)
	{
		super(context);
		this.__obj_src = obj_src;
	}

	@java.lang.Override
	public java.lang.Boolean executeAction() throws Exception
	{
		this.obj_src = __obj_src == null ? null : system.proxies.FileDocument.initialize(getContext(), __obj_src);

		// BEGIN USER CODE
		throw new com.mendix.systemwideinterfaces.MendixRuntimeException("Java action was not implemented");
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "ja_arc_deflate64";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
