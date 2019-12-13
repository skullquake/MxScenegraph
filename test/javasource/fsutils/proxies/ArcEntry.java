// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package fsutils.proxies;

public class ArcEntry extends system.proxies.FileDocument
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "FSUtils.ArcEntry";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Path("Path"),
		FileID("FileID"),
		Name("Name"),
		DeleteAfterDownload("DeleteAfterDownload"),
		Contents("Contents"),
		HasContents("HasContents"),
		Size("Size");

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

	public ArcEntry(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "FSUtils.ArcEntry"));
	}

	protected ArcEntry(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject arcEntryMendixObject)
	{
		super(context, arcEntryMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("FSUtils.ArcEntry", arcEntryMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a FSUtils.ArcEntry");
	}

	/**
	 * @deprecated Use 'ArcEntry.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static fsutils.proxies.ArcEntry initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return fsutils.proxies.ArcEntry.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static fsutils.proxies.ArcEntry initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new fsutils.proxies.ArcEntry(context, mendixObject);
	}

	public static fsutils.proxies.ArcEntry load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return fsutils.proxies.ArcEntry.initialize(context, mendixObject);
	}

	public static java.util.List<fsutils.proxies.ArcEntry> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<fsutils.proxies.ArcEntry> result = new java.util.ArrayList<fsutils.proxies.ArcEntry>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//FSUtils.ArcEntry" + xpathConstraint))
			result.add(fsutils.proxies.ArcEntry.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of Path
	 */
	public final java.lang.String getPath()
	{
		return getPath(getContext());
	}

	/**
	 * @param context
	 * @return value of Path
	 */
	public final java.lang.String getPath(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Path.toString());
	}

	/**
	 * Set value of Path
	 * @param path
	 */
	public final void setPath(java.lang.String path)
	{
		setPath(getContext(), path);
	}

	/**
	 * Set value of Path
	 * @param context
	 * @param path
	 */
	public final void setPath(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String path)
	{
		getMendixObject().setValue(context, MemberNames.Path.toString(), path);
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final fsutils.proxies.ArcEntry that = (fsutils.proxies.ArcEntry) obj;
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
		return "FSUtils.ArcEntry";
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
