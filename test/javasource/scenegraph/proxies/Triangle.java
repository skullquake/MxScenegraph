// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

public class Triangle extends scenegraph.proxies.Primitive
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.Triangle";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		x0("x0"),
		y0("y0"),
		z0("z0"),
		x1("x1"),
		y1("y1"),
		z1("z1"),
		x2("x2"),
		y2("y2"),
		z2("z2"),
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

	public Triangle(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.Triangle"));
	}

	protected Triangle(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject triangleMendixObject)
	{
		super(context, triangleMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.Triangle", triangleMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.Triangle");
	}

	/**
	 * @deprecated Use 'Triangle.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.Triangle initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.Triangle.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.Triangle initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new scenegraph.proxies.Triangle(context, mendixObject);
	}

	public static scenegraph.proxies.Triangle load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.Triangle.initialize(context, mendixObject);
	}

	public static java.util.List<scenegraph.proxies.Triangle> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.Triangle> result = new java.util.ArrayList<scenegraph.proxies.Triangle>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.Triangle" + xpathConstraint))
			result.add(scenegraph.proxies.Triangle.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of x0
	 */
	public final java.lang.Double getx0()
	{
		return getx0(getContext());
	}

	/**
	 * @param context
	 * @return value of x0
	 */
	public final java.lang.Double getx0(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.x0.toString());
	}

	/**
	 * Set value of x0
	 * @param x0
	 */
	public final void setx0(java.lang.Double x0)
	{
		setx0(getContext(), x0);
	}

	/**
	 * Set value of x0
	 * @param context
	 * @param x0
	 */
	public final void setx0(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double x0)
	{
		getMendixObject().setValue(context, MemberNames.x0.toString(), x0);
	}

	/**
	 * @return value of y0
	 */
	public final java.lang.Double gety0()
	{
		return gety0(getContext());
	}

	/**
	 * @param context
	 * @return value of y0
	 */
	public final java.lang.Double gety0(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.y0.toString());
	}

	/**
	 * Set value of y0
	 * @param y0
	 */
	public final void sety0(java.lang.Double y0)
	{
		sety0(getContext(), y0);
	}

	/**
	 * Set value of y0
	 * @param context
	 * @param y0
	 */
	public final void sety0(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double y0)
	{
		getMendixObject().setValue(context, MemberNames.y0.toString(), y0);
	}

	/**
	 * @return value of z0
	 */
	public final java.lang.Double getz0()
	{
		return getz0(getContext());
	}

	/**
	 * @param context
	 * @return value of z0
	 */
	public final java.lang.Double getz0(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.z0.toString());
	}

	/**
	 * Set value of z0
	 * @param z0
	 */
	public final void setz0(java.lang.Double z0)
	{
		setz0(getContext(), z0);
	}

	/**
	 * Set value of z0
	 * @param context
	 * @param z0
	 */
	public final void setz0(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double z0)
	{
		getMendixObject().setValue(context, MemberNames.z0.toString(), z0);
	}

	/**
	 * @return value of x1
	 */
	public final java.lang.Double getx1()
	{
		return getx1(getContext());
	}

	/**
	 * @param context
	 * @return value of x1
	 */
	public final java.lang.Double getx1(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.x1.toString());
	}

	/**
	 * Set value of x1
	 * @param x1
	 */
	public final void setx1(java.lang.Double x1)
	{
		setx1(getContext(), x1);
	}

	/**
	 * Set value of x1
	 * @param context
	 * @param x1
	 */
	public final void setx1(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double x1)
	{
		getMendixObject().setValue(context, MemberNames.x1.toString(), x1);
	}

	/**
	 * @return value of y1
	 */
	public final java.lang.Double gety1()
	{
		return gety1(getContext());
	}

	/**
	 * @param context
	 * @return value of y1
	 */
	public final java.lang.Double gety1(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.y1.toString());
	}

	/**
	 * Set value of y1
	 * @param y1
	 */
	public final void sety1(java.lang.Double y1)
	{
		sety1(getContext(), y1);
	}

	/**
	 * Set value of y1
	 * @param context
	 * @param y1
	 */
	public final void sety1(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double y1)
	{
		getMendixObject().setValue(context, MemberNames.y1.toString(), y1);
	}

	/**
	 * @return value of z1
	 */
	public final java.lang.Double getz1()
	{
		return getz1(getContext());
	}

	/**
	 * @param context
	 * @return value of z1
	 */
	public final java.lang.Double getz1(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.z1.toString());
	}

	/**
	 * Set value of z1
	 * @param z1
	 */
	public final void setz1(java.lang.Double z1)
	{
		setz1(getContext(), z1);
	}

	/**
	 * Set value of z1
	 * @param context
	 * @param z1
	 */
	public final void setz1(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double z1)
	{
		getMendixObject().setValue(context, MemberNames.z1.toString(), z1);
	}

	/**
	 * @return value of x2
	 */
	public final java.lang.Double getx2()
	{
		return getx2(getContext());
	}

	/**
	 * @param context
	 * @return value of x2
	 */
	public final java.lang.Double getx2(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.x2.toString());
	}

	/**
	 * Set value of x2
	 * @param x2
	 */
	public final void setx2(java.lang.Double x2)
	{
		setx2(getContext(), x2);
	}

	/**
	 * Set value of x2
	 * @param context
	 * @param x2
	 */
	public final void setx2(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double x2)
	{
		getMendixObject().setValue(context, MemberNames.x2.toString(), x2);
	}

	/**
	 * @return value of y2
	 */
	public final java.lang.Double gety2()
	{
		return gety2(getContext());
	}

	/**
	 * @param context
	 * @return value of y2
	 */
	public final java.lang.Double gety2(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.y2.toString());
	}

	/**
	 * Set value of y2
	 * @param y2
	 */
	public final void sety2(java.lang.Double y2)
	{
		sety2(getContext(), y2);
	}

	/**
	 * Set value of y2
	 * @param context
	 * @param y2
	 */
	public final void sety2(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double y2)
	{
		getMendixObject().setValue(context, MemberNames.y2.toString(), y2);
	}

	/**
	 * @return value of z2
	 */
	public final java.lang.Double getz2()
	{
		return getz2(getContext());
	}

	/**
	 * @param context
	 * @return value of z2
	 */
	public final java.lang.Double getz2(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.z2.toString());
	}

	/**
	 * Set value of z2
	 * @param z2
	 */
	public final void setz2(java.lang.Double z2)
	{
		setz2(getContext(), z2);
	}

	/**
	 * Set value of z2
	 * @param context
	 * @param z2
	 */
	public final void setz2(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double z2)
	{
		getMendixObject().setValue(context, MemberNames.z2.toString(), z2);
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final scenegraph.proxies.Triangle that = (scenegraph.proxies.Triangle) obj;
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
		return "SceneGraph.Triangle";
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
