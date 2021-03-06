// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package scenegraph.proxies;

public class Lathe extends scenegraph.proxies.Primitive
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "SceneGraph.Lathe";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		r("r"),
		tesselation("tesselation"),
		clip("clip"),
		arc("arc"),
		closed("closed"),
		cap("cap"),
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
		Texture("SceneGraph.Texture"),
		Primitive_Material("SceneGraph.Primitive_Material");

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

	public Lathe(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "SceneGraph.Lathe"));
	}

	protected Lathe(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject latheMendixObject)
	{
		super(context, latheMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("SceneGraph.Lathe", latheMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a SceneGraph.Lathe");
	}

	/**
	 * @deprecated Use 'Lathe.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static scenegraph.proxies.Lathe initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return scenegraph.proxies.Lathe.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static scenegraph.proxies.Lathe initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new scenegraph.proxies.Lathe(context, mendixObject);
	}

	public static scenegraph.proxies.Lathe load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return scenegraph.proxies.Lathe.initialize(context, mendixObject);
	}

	public static java.util.List<scenegraph.proxies.Lathe> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<scenegraph.proxies.Lathe> result = new java.util.ArrayList<scenegraph.proxies.Lathe>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//SceneGraph.Lathe" + xpathConstraint))
			result.add(scenegraph.proxies.Lathe.initialize(context, obj));
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
	 * @return value of clip
	 */
	public final java.lang.Integer getclip()
	{
		return getclip(getContext());
	}

	/**
	 * @param context
	 * @return value of clip
	 */
	public final java.lang.Integer getclip(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.clip.toString());
	}

	/**
	 * Set value of clip
	 * @param clip
	 */
	public final void setclip(java.lang.Integer clip)
	{
		setclip(getContext(), clip);
	}

	/**
	 * Set value of clip
	 * @param context
	 * @param clip
	 */
	public final void setclip(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer clip)
	{
		getMendixObject().setValue(context, MemberNames.clip.toString(), clip);
	}

	/**
	 * @return value of arc
	 */
	public final java.lang.Double getarc()
	{
		return getarc(getContext());
	}

	/**
	 * @param context
	 * @return value of arc
	 */
	public final java.lang.Double getarc(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Double) getMendixObject().getValue(context, MemberNames.arc.toString());
	}

	/**
	 * Set value of arc
	 * @param arc
	 */
	public final void setarc(java.lang.Double arc)
	{
		setarc(getContext(), arc);
	}

	/**
	 * Set value of arc
	 * @param context
	 * @param arc
	 */
	public final void setarc(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Double arc)
	{
		getMendixObject().setValue(context, MemberNames.arc.toString(), arc);
	}

	/**
	 * @return value of closed
	 */
	public final java.lang.Boolean getclosed()
	{
		return getclosed(getContext());
	}

	/**
	 * @param context
	 * @return value of closed
	 */
	public final java.lang.Boolean getclosed(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.closed.toString());
	}

	/**
	 * Set value of closed
	 * @param closed
	 */
	public final void setclosed(java.lang.Boolean closed)
	{
		setclosed(getContext(), closed);
	}

	/**
	 * Set value of closed
	 * @param context
	 * @param closed
	 */
	public final void setclosed(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean closed)
	{
		getMendixObject().setValue(context, MemberNames.closed.toString(), closed);
	}

	/**
	 * @return value of cap
	 */
	public final java.lang.String getcap()
	{
		return getcap(getContext());
	}

	/**
	 * @param context
	 * @return value of cap
	 */
	public final java.lang.String getcap(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.cap.toString());
	}

	/**
	 * Set value of cap
	 * @param cap
	 */
	public final void setcap(java.lang.String cap)
	{
		setcap(getContext(), cap);
	}

	/**
	 * Set value of cap
	 * @param context
	 * @param cap
	 */
	public final void setcap(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String cap)
	{
		getMendixObject().setValue(context, MemberNames.cap.toString(), cap);
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
			final scenegraph.proxies.Lathe that = (scenegraph.proxies.Lathe) obj;
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
		return "SceneGraph.Lathe";
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
