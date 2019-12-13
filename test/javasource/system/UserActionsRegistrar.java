package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(fsutils.actions.ja_arc_7z.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_ar.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_arj.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_brotli.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_bzip2.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_cpio.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_deflate.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_deflate64.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_gzip.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_lz4.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_lzma.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_pack200.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_snappy.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_tar.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_unixdump.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_xz.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_z.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_zip.class);
    registrator.registerUserAction(fsutils.actions.ja_arc_zstandard.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_7z.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_ar.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_arj.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_brotli.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_bzip2.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_cpio.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_deflate.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_deflate64.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_gzip.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_lz4.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_lzma.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_pack200.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_snappy.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_tar.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_unixdump.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_xz.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_z.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_zip.class);
    registrator.registerUserAction(fsutils.actions.ja_unarc_zstandard.class);
    registrator.registerUserAction(main.actions.ja_imendixobject2json.class);
    registrator.registerUserAction(main.actions.ja_str2filedocument.class);
    registrator.registerUserAction(splitstringutility.actions.SplitString.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
