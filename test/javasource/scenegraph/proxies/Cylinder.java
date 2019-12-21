// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

public class Cylinder extends scenegraph.proxies.Primitive
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.Cylinder";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		d0("d0"),
		d1("d1"),
		h("h"),
		tesselation("tesselation"),
		doublesided("doublesided"),
		Name("Name"),
		x("x"),
		y("y"),
		z("z"),
		rotx("rotx"),
		roty("roty"),
		rotz("rotz"),
		sclx("sclx"),
		scly("scly"),
		sclz("sclz"),
		color("color"),
		visible("visible"),
		opacity("opacity"),
		Primitive_Node("SceneGraph.Primitive_Node"),
		Selected("SceneGraph.Selected"),
		Texture("SceneGraph.Texture");

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

	public Cylinder(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.Cylinder"));
	}

	protected Cylinder(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject cylinderMendixObject)
	{
		super(context, cylinderMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.Cylinder", cylinderMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.Cylinder");
	}

	/**
	 * @deprecated Use 'Cylinder.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.Cylinder initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.Cylinder.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.Cylinder initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new scenegraph.proxies.Cylinder(context, mendixObject);
	}

	public static scenegraph.proxies.Cylinder load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.Cylinder.initialize(context, mendixObject);
	}

	public static java.util.List<scenegraph.proxies.Cylinder> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.Cylinder> result = new java.util.ArrayList<scenegraph.proxies.Cylinder>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.Cylinder" + xpathConstraint))
			result.add(scenegraph.proxies.Cylinder.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of d0
	 */
	public final java.lang.Double getd0()
	{
		return getd0(getContext());
	}

	/**
	 * @param context
	 * @return value of d0
	 */
	public final java.lang.Double getd0(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.d0.toString());
	}

	/**
	 * Set value of d0
	 * @param d0
	 */
	public final void setd0(java.lang.Double d0)
	{
		setd0(getContext(), d0);
	}

	/**
	 * Set value of d0
	 * @param context
	 * @param d0
	 */
	public final void setd0(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double d0)
	{
		getMendixObject().setValue(context, MemberNames.d0.toString(), d0);
	}

	/**
	 * @return value of d1
	 */
	public final java.lang.Double getd1()
	{
		return getd1(getContext());
	}

	/**
	 * @param context
	 * @return value of d1
	 */
	public final java.lang.Double getd1(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.d1.toString());
	}

	/**
	 * Set value of d1
	 * @param d1
	 */
	public final void setd1(java.lang.Double d1)
	{
		setd1(getContext(), d1);
	}

	/**
	 * Set value of d1
	 * @param context
	 * @param d1
	 */
	public final void setd1(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double d1)
	{
		getMendixObject().setValue(context, MemberNames.d1.toString(), d1);
	}

	/**
	 * @return value of h
	 */
	public final java.lang.Double geth()
	{
		return geth(getContext());
	}

	/**
	 * @param context
	 * @return value of h
	 */
	public final java.lang.Double geth(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.h.toString());
	}

	/**
	 * Set value of h
	 * @param h
	 */
	public final void seth(java.lang.Double h)
	{
		seth(getContext(), h);
	}

	/**
	 * Set value of h
	 * @param context
	 * @param h
	 */
	public final void seth(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double h)
	{
		getMendixObject().setValue(context, MemberNames.h.toString(), h);
	}

	/**
	 * @return value of tesselation
	 */
	public final java.lang.Integer gettesselation()
	{
		return gettesselation(getContext());
	}

	/**
	 * @param context
	 * @return value of tesselation
	 */
	public final java.lang.Integer gettesselation(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.tesselation.toString());
	}

	/**
	 * Set value of tesselation
	 * @param tesselation
	 */
	public final void settesselation(java.lang.Integer tesselation)
	{
		settesselation(getContext(), tesselation);
	}

	/**
	 * Set value of tesselation
	 * @param context
	 * @param tesselation
	 */
	public final void settesselation(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer tesselation)
	{
		getMendixObject().setValue(context, MemberNames.tesselation.toString(), tesselation);
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
			final scenegraph.proxies.Cylinder that = (scenegraph.proxies.Cylinder) obj;
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
		return "SceneGraph.Cylinder";
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
