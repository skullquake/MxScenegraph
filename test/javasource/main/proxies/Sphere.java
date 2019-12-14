// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package main.proxies;

public class Sphere extends main.proxies.Primitive
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "Main.Sphere";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		r("r"),
		doublesided("doublesided"),
		Name("Name"),
		x("x"),
		y("y"),
		z("z"),
		rotx("rotx"),
		roty("roty"),
		rotz("rotz"),
		visible("visible"),
		color("color"),
		Primitive_Node("Main.Primitive_Node"),
		Selected("Main.Selected"),
		Texture("Main.Texture");

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

	public Sphere(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "Main.Sphere"));
	}

	protected Sphere(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject sphereMendixObject)
	{
		super(context, sphereMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("Main.Sphere", sphereMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a Main.Sphere");
	}

	/**
	 * @deprecated Use 'Sphere.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static main.proxies.Sphere initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return main.proxies.Sphere.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static main.proxies.Sphere initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new main.proxies.Sphere(context, mendixObject);
	}

	public static main.proxies.Sphere load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return main.proxies.Sphere.initialize(context, mendixObject);
	}

	public static java.util.List<main.proxies.Sphere> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<main.proxies.Sphere> result = new java.util.ArrayList<main.proxies.Sphere>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//Main.Sphere" + xpathConstraint))
			result.add(main.proxies.Sphere.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of r
	 */
	public final java.lang.Double getr()
	{
		return getr(getContext());
	}

	/**
	 * @param context
	 * @return value of r
	 */
	public final java.lang.Double getr(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.r.toString());
	}

	/**
	 * Set value of r
	 * @param r
	 */
	public final void setr(java.lang.Double r)
	{
		setr(getContext(), r);
	}

	/**
	 * Set value of r
	 * @param context
	 * @param r
	 */
	public final void setr(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double r)
	{
		getMendixObject().setValue(context, MemberNames.r.toString(), r);
	}

	/**
	 * @return value of doublesided
	 */
	public final java.lang.Boolean getdoublesided()
	{
		return getdoublesided(getContext());
	}

	/**
	 * @param context
	 * @return value of doublesided
	 */
	public final java.lang.Boolean getdoublesided(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.doublesided.toString());
	}

	/**
	 * Set value of doublesided
	 * @param doublesided
	 */
	public final void setdoublesided(java.lang.Boolean doublesided)
	{
		setdoublesided(getContext(), doublesided);
	}

	/**
	 * Set value of doublesided
	 * @param context
	 * @param doublesided
	 */
	public final void setdoublesided(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean doublesided)
	{
		getMendixObject().setValue(context, MemberNames.doublesided.toString(), doublesided);
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final main.proxies.Sphere that = (main.proxies.Sphere) obj;
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
		return "Main.Sphere";
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
