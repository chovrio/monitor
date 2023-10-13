import Site from '../model/site.model';

// 创建站点
export const createSite = async (
  site: string,
  name: string,
  username: string,
  option_id: string
) => {
  const res = await Site.create({
    site,
    name,
    username,
    option_id,
  });
  return res.dataValues;
};

// 通过指定信息查询站点
export const findSiteByInfo = async (info: {
  username?: string;
  site?: string;
  name?: string;
  id?: string;
}) => {
  const whereOpt = info;
  const res = await Site.findAll({
    attributes: ['id', 'site', 'name', 'username', 'option_id'],
    where: whereOpt,
  });
  return res.map((item) => item.dataValues);
};
