import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/stripe";
import { useEffect,useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";


const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { user,token } = useSelector((state) => ({ ...state }));
 

  useEffect(() => {
    
    getAccountBalance(user.token).then((res) => {
      console.log(res);
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(user.token);
      console.log("RES FOR PAYOUT SETTING LINK", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Unable to access settings. Try again");
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
         <Meta
          avatar={<Avatar>{user.user.name}</Avatar>}
          title={user.user.name}
          description={`Joined ${moment(user.user.createdAt).fromNow()}`}
        />
      </Card>
      
     

      {user &&
        user.user &&
        user.user.stripe_seller &&
        user.user.stripe_seller.charges_enabled && (
          <>


            <Ribbon text="Avaliable" color="grey">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                    {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>

  );
};

export default ConnectNav;
