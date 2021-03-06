// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

/**
 * uses:
 *     models (gltf,.babylon,.obj,etc.)
 */
public class ModelFile extends system.proxies.FileDocument
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.ModelFile";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		FileID("FileID"),
		Name("Name"),
		DeleteAfterDownload("DeleteAfterDownload"),
		Contents("Contents"),
		HasContents("HasContents"),
		Size("Size"),
		Model_ModelFile("SceneGraph.Model_ModelFile");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public ModelFile(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.ModelFile"));
	}

	protected ModelFile(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject modelFileMendixObject)
	{
		super(context, modelFileMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.ModelFile", modelFileMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.ModelFile");
	}

	/**
	 * @deprecated Use 'ModelFile.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.ModelFile initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.ModelFile.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.ModelFile initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new scenegraph.proxies.ModelFile(context, mendixObject);
	}

	public static scenegraph.proxies.ModelFile load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.ModelFile.initialize(context, mendixObject);
	}

	public static java.util.List<scenegraph.proxies.ModelFile> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.ModelFile> result = new java.util.ArrayList<scenegraph.proxies.ModelFile>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.ModelFile" + xpathConstraint))
			result.add(scenegraph.proxies.ModelFile.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of Model_ModelFile
	 */
	public final scenegraph.proxies.Model getModel_ModelFile() throws com.mendix.core.CoreException
	{
		return getModel_ModelFile(getContext());
	}

	/**
	 * @param context
	 * @return value of Model_ModelFile
	 */
	public final scenegraph.proxies.Model getModel_ModelFile(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		scenegraph.proxies.Model result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Model_ModelFile.toString());
		if (identifier != null)
			result = scenegraph.proxies.Model.load(context, identifier);
		return result;
	}

	/**
	 * Set value of Model_ModelFile
	 * @param model_modelfile
	 */
	public final void setModel_ModelFile(scenegraph.proxies.Model model_modelfile)
	{
		setModel_ModelFile(getContext(), model_modelfile);
	}

	/**
	 * Set value of Model_ModelFile
	 * @param context
	 * @param model_modelfile
	 */
	public final void setModel_ModelFile(com.mendix.systemwideinterfaces.core.IContext context, scenegraph.proxies.Model model_modelfile)
	{
		if (model_modelfile == null)
			getMendixObject().setValue(context, MemberNames.Model_ModelFile.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.Model_ModelFile.toString(), model_modelfile.getMendixObject().getId());
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final scenegraph.proxies.ModelFile that = (scenegraph.proxies.ModelFile) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "SceneGraph.ModelFile";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Override
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
