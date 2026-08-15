import { supabase } from "./supabase";
import { useState, useEffect, useRef } from "react";
const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAACWCAYAAAC8XoS0AAAhm0lEQVR4nO19a5QlV3Xet885VfdW1X10T09r0IORkBBCIGFACgZs7B6CsTBgohVNwxhjQ1hJbLJCssLTawlmBhIgsYkdLxIHTAAhDKQHYkAyCIHp5mERE0Eg0iAQAskSes5Md99HveucnR9V1dOv2337cW/3iPnWumt67q1b59yvdu29zz577yIMEcxMx44dE+Pj43TgwAENgBd/ftdd36o/9FBnv++nF2utLwHMRcbgAmbex4bHGFwnItcYUyEiwcxERBpAAiAE0CaikwAeIaL7iOgeZr5bSnnPtdde+8Dy+UxPT6sTJ07w5OSkWT6XQYKGMQgziyNHjoijR49mi9//u7/72ws7nejqNM6emxnzbK31pQD2KaVsKWX5XRhjlvzLvJQfIgIRQQgBIcTC/5kZaZrCGNMCcB8R/YCIbjPGfPu66667k4hMeY7Dhw+rI0eOaCIaOPlDIb0EM1u33nrrc3SWXZNmyW9kmfmlarVaFUIgyzKkaQqtNYwxvJiQcp6FZK82by4vREEaLzpeCCFgWRYsywIABEEAAD8UQtwK4HNZln1rcnJSD/K3L8agSSfm29Wtt556Tpqm12ZZ9lIAT7VtG2maIkkSMLPmgh1mFj1I3RKK8zMAw8wgImXbNmzbRpIkMMbcaYz5pDHm08ePH/+Ho0ePLly4QUAN6sSnpfIqlaY3T9l25bwkSZCmKcdxrIsPBQBZEI3y3+1GMRYBKC8qkiQxcRwbANK27StGRkbeMzs7OwngHzGzHtRcgPxHDwRExNPT05KIQrda+UiWZTrLsoRyKAASQ1ZvyyCISBERpWmaJEmiAXzu6NGj2czMjBzowIM8+cTEhAGAJ1543g1aZ5qZLQzRS+gTTERWEAQpgI8CwMzMjFnnO1vCQEknIjM1NSUvvfSKe5SSX3VdFwCGZrD6hHYch7TWt0xOTt4/NTUljx49euaSDgDj4+MEgEZHmx9SSpIxZidVygows2BmCCE+hCGpu4EPUhpUZrZvuummH2VZdlGWZQZDuOB9wNi2LaIoukcI8fSDBw+mhQEdqAoc+A9fZFBjz3M+7jgOmHmgt2+/YGZj2zaEEDdMTk4mhQEduM0ZirSVBvWCC/bdkKZJjNxz2WmDykIIGQRBJIS4ERi8AS0xFNKJyDCzuOyyZ/zMUvIru8SgasdxoLW+5brrrvuHYRjQEkPTqzMzMwIA7WmOflDKnTeohQElZv5LDHm9MMzByviJddNNX7gry/TFO2hQjW3bIkmSewAMzYCWGOYPLg1qUqt5N+ykQS0NKIChGtASQ5WyiYncUD3p3PM/nqZJREQ7YVB3zICWGCrpREfN1NSUfNLll99n29aXHdclDN+glivQLw/bgJYYuj4tV6h7mqMflIJgjBnqHMoVKDN/CAAdP3586AZ9JzyIBYN68803HU/T7MlDNKjGtm0Rx/FPiehpwzagJXbCc1gwqJ7nfmyYBnWnDWiJHYl/lIbrwgufcGOapuGQDOqCATXG7IgBLbEjpB89mhvUSy654n7bVl9yh2NQFwzooUOH7tsJA1pixyJ9Bw8eBADau3fPB8UQDOpyAzrIsdbDjpFe5Kvgqqt+edpo/WO7UhEABiV5plKpiCAIfiqE+Cozo8h12REM5YofPnxYTExMiJmZGUxMTCz+SJ04cSIdHxv7oyRL3z0/38qK/dNtBTNnzWZTtdvtdwF41/j4uAUgA4ATJ04s2JLjx4/zMFTOrtjFYWb3ppu+8PM4TkaLBJZtmxczc5G41A7DcP9rXvOa9nade7MYKOlTU1NycnJSf+Urt7w6y/iaTqcTAwiNMW0hRAtAF0AspfSEEG8zxpyXZdlCRtE2wViWJdI0vZeZ31vkv9SklHuZ+RxmHmVm6bpu1ul0Pn7o0KGby3lv4xyWYGB5L4tRq3mPRWH6u1mWoUyXK1Ek/yAIAmitsc2EA4BIkgRKqSc5jvOhcrwSxhgQEYwxkFK+B8jVzDbPYQkGrl5Kqbnlli/dmKbZ74RhmDDziotd+OoDm0+htpZIb0G2rtVqlW63+x9e9apXXT9oKQeGszEtiIjvvuOOi3983713hmFkF+PuBntilFKktX6EmS8/fvx458iRI2UK3sAwjI1pMzU1JZ5y5ZU/rVTsv6jX64KZd3qrDgBgjOFqtUrGmMOTk5Mt5FlfAw8LDEWnHz9+nA8fPiye/vQr3/O9737396VUI1pvu8HcKLTjOLLT6fyAiD5S3JFDEYahLI6OHj1qJiYmxPnnn3+y5jnvq9U8sRvSMIgIUso3T05O6mPHjhEeb9t1ExMT+vDhw2LihS/6QJom99m2PcgV6JowxmjXdWUQBDdfd911Xx2G8VyMoZFORDwxMSGIKGw26+9wHYd2QNoZgJFSIkmShJnfCoAOHjz4+I2nHzhwIGNm8YIXTHwy09n3qtWqYuYMuSuXLfrbIM+mxWZfxfd1cb7ynMTMotlsyjiOP3jo0KG7pqamxLKqj4Fj6AGvY8eOERGZsbGRtysp2bZtVavVZLPZVM1mU7muKy3LEsxMSZoi3eQLILIsS3qeJ+v1unRdVwghIKX02+32Dz3Pexcz06AXQqthR7wHZhYAcPPNNz8tiiKv1WpVtEbdrbv76q77ZMepPr1asZ8B4EJm3tgciZhAmTb6R3Gc3h4EwfdbrdaPT51qP0iUtfbv3x8B6B48eDDKDx+8i7hiisMcjJklcDqsW7xXAfAsIH0esvRqw+YyZj7PGB5l5upmHApmsBAiIEGzQoifC4gfQanbAevvAdxBRMmyOS0vLBsohpIqjXzRsUC07588X7B8CRP+CZif73jeKGAD0ICOkSQLVXabHlcIAaUULNsGhAVAgrMAcZw8SFLMwJjPhQm+Ojo6Ol/MUyAvTxq4FzNQ0plZlj+CmSnyW79JRK9l8DVVt9YENJIwRJqmBoWhK1/bsXAq4i0LL2aW1WqVVMUBYBCH4UMAfU4z3+B5I98p54llQrLdGAjpS8i+995qND7yainlH1qWdRWkRBz4SNO0rGATQ16ZmrLo1LZtaVU9JKEPALeywZ9Xa82/KX6DAPIwxnZPYFu9lyILVhKRnpqakmF37vXJvj3/t+rVPmxZ8irf7xq/3dJZlrEQQhKR3IFQgCjGlUmSsN+ey9I0ge1UX1xx7JvjsPX1sDt/DREZIjLT09Nqw8Z8HWznDs2CdIfdU9cIab3brrpXmzRCEAS6KGXcDSUvq6IoIqZaoy7YMLJUfz7O0nfU63vuAE6HqLdjrO3Qmws60D95//mWN/I+ZanfJQDdbnfXk70cRQSUvEZTJFEUwfAfP/Sd773nSQcORMzTiuhAtu5J1sGWSC8icwYAgs7sq5Wl3m9V3H1+e84UFWtnDNnLYYzRUkrp1EaRRt3vZ0n6Brc59u1C128p5r5pUvKrTubEXXfVo2D+I06t9glm3ue357KiCcIZSzgACCGkMYb91snMstQzVcX+RhTMv63Q9cw8temq6k1JOjMrIspmH3ngGbVm8xNW1bvSb89qZhZCiN2wI7StMMYYIQS59T2UhJ3PhSdbrx/Zv3+Wp6cVHdi4utkwQSXh7blHrq06tY9ZSja63U4mhBjKhshOodxj9RqjKo3CH8VB92B97Nw7Sz42cq6+SV9sMDutx/6N69b+LE0SZFmiicRAGxjsJhhjMq9WU1mm54Nu+5Uje8+/daPE90X6Eg+lc+rdbq15fdCZN8YYejyqk/XAxmirUpEkZBaHndfUR8799EaIX9fYMTPNzMxIItJ+++T73dro9UFnPmPmX0jCAYCEkEkcmyxNpOs1P9Wde/R1RJStllqy6vfXO6C8gt35x/7Ea46/KeicSpnZ2tk95d0BYwxLKbnqeiLotl5Xa+77WD8Sv6akLxjN+ccOe829bwq6ZwlfDCEEaa0pDgNddesfnT/18GQ/Et+TdOYpmRP+yB/Um3uOBJ3ZjA2rs4QvRUl8msTG9Wp/NTf38AuJKOOp3n78qgzmhE/qbuvUS+xq5W90mhit9bCjgWcUjDHGrlQEM80nQfdXGnvP++HiFftirJD03FM5aJhZgPjPlBQ0oMTOxxWEECKJY11xKiPStm9knlYoGuWtOHa1E+RxhYeqxKhnacq9jjuLpSAikQQBM/hJwJVur/hMTzLbbXZAXN3uWPLjHQwQgUS3m1Z7HdOTdKUqFYAqy1usnsXaKPiqyMSuAACOHOlLvRAAJElWAWBtZXP4FxEF6SqRmQ0AOHJkxTE9JV0IZZf+5lkb2h9KnphZCiGsXsf1dOKFkLYkUCHpZ1nvD8TMkFLSWguknpJuE1lSiNPtms+ib+QS33uLcpUPjhEAZFpbZ/jmz46g6GANe4194VVugYMAAE3aopz0ba3rXA0LzbvXuqeKJvRnEHpy1lPvKFhyLQO6yGisdf4C5TElafnfxhgQ+q8MWDodwmZbrZ9O/AIWX8fT56eFv/PPGduZ0NCTdK11z+AWM0NIG5btQMg1JrNwPQhLiGeAwdA6TyNhU2TUrTYc58sNMIOEABsDZgNjNNhosMmjqOt6WMw5zSQhlIIQEvmdvOh7bPJHQBgNY3T+yAeZV1rqNIQUYt10Vsp3rUFrFLP1JJ3IKOQJ9ivGISLoLIbOElS9JqTscZri95QFsnnhrACJooP8NuzyaZ0hS2NkSQQq1oPLwcwgYcGuOFDK2rALrLVGmIZ9H8/MSNdQlr3jvkoJLBC1cpI5iQZJHMJx66ueIstSxGEHzAZCCLDJSRFCoeJ4fZGeJjGSOChuGAIJCcuuQqncDZZSQUoFy3YQh10YnSyaL4OZYFfrsIoFYglmQOsUOssWSbWCUhaWOxAbtSXF8T215hrB9n6UGK2pUdM4BFhDkMjVQ9Euy+gYUaDheCNrSp0xBnHUhaBCNTHDZCmiNIayqqg43sL3hRBwvAai0IdOAwghYAyh4jah1NKfmWUpksgH6wxYdCPrBEhJQFlV2FV34dyLSmrWAxMRGWOYqXfToJ7EktZitVt1yTFYWwqkXKYzy0GFgNEZsjRd8/wAIJYYSwKRgBAEnYUI/daK8auOB2k5yDKNittYSXiaIA5agMlAIj/fwkvkPzlLgiXnFoJye7LOXBfNxRhjem7Z9d45kkKjj9tqU24co7id176Z1pIwIgE2KaKwu+KzStWD7dQXVFAJrTXisJOfcy3PTAjAZKte1D5hmDdBOrLMoIc+3yqMMVC209sA9wkiAZ1GyLuDL36fUKk4K45P4gB9l9MQgU2KOApyd7HvrxGIKLNtKyd9IwEvZpEi73m1jenUBsYwVMVDpeotvK+1RhR0NiVVQhDSJFj3u8YYmCzZkBCVFzWOQvTLenF+zaxL0ld8saeoSSnTra8AGXl9rgBIQFoOLLu6IOHG5N6PTsPi8WebGYPARkNnKZRl9zxK6wy5Q7GxRQ4RkMZ+IcH9HE8AWBvj9FQvq5B+DACQcpLaxgK2EAIgUlC2B8uqQC4yaFmaIEtzPx8wZYBos8MAwLqkG60X1lkbxUZzqhjQxpj+F0fHcs7hqGqy1Q0Mq+LAQrFYSBPoNIHWCVBUp9PCQ722dkcRAN3bbhVjbWmI/udCBGLKms20f0kv6+RjY1ILtOksgCxLkaUxjM7A5vRTMNfzHDaF3Hdd96Bh8E5EYEKGh5KN++nMJi1SL4BNiKLOYmRJAHCGnOe+FxgDgVRqCOJOeT8DIMN5/qZIL5sjbMqryElefXG03ch19doGUkiFwbf05SI2xxpo99TNPWdqjM52QyOc/sAQ6/j8BEDZTh7/GShylxG4auOSXqnYGQBzZmxKE5RVWfcou1KFUDY2JksMJqufxXk+EyKQoKxMp1uNv5WkFysoDtgMo05+q2A2kFZ1Rb/H8tHIy1F16xDC6pt4BkEpG7wRtcRLgl0rvrga6fleSdUsNLrpa5jlbxToe6KrndTkK9heM2A2IGEtWd2WiIIW4shf8T6RQNVrQshK0fCh9xSZDaS0IJXKQ9x9T3ztK7SlPSgGl7HnctdtYTBBghzHIWOMKQpi15gIFQ/uXvbAbpFH/8wSqeTiWAOhqnC85opbOAw6+So1jVYNiBERHK8B22kAlBPKbJa8jCkuqFNDH/7ohrDpiBMzc6VSoTTLfgbgHAC18iPk0fNHwiBoe7XaU0kKBF0fRbsosbKCmgsPZCl5RATbqSGJAjDrYkMl326zrMqKFajWGknkL9nI0GmI0GhYFW9FmNe2K7DtCqdpykanhUoyEEJCSMX5LpNgIaDENtq2LYX5iASMjpUx2QeFUC9FTv4oAGFXnHOksv+71rGrs+T5QshfqXoNBR3B9wMgb6UtCCRABKvqrWp0lLKgas0156G1RppE0GmE3G07fZ4yBBwH80iVDWVVIaViIUR5ZyrLsghWz4QsGK07xhhLWVZVb0Oa4UrS84RHpkhI2BC91DIRURiGutbcsz/szn7HqY2/BTnpewFcAOASKeWlkO6cAl6YJN2nprF/rdbmWmVZz644dYUsQqfrQ6hqxgyRxNHKqFc5frmLUxLBxQbyworXrLEuIBCYTRqbKImglCWdWkMCEnEUppZl/0RIqYwxFgAthPABzAI4BSAF67stu/J2Y3R/6SjrLH5XfFhWDwSzsxcaqe+WUtpa617dQnXVcWXod/+f1xx/Zq987OUVCYk/fzUL+m1mfjmBnmk7LnQSIQhO3wEg6hlmKiJ5WC8NozDkBgxIJWXV8wBIRH4nZPC3mc0XsjD6UvOcC+4uav4lcjd5idfmt06+z23seZvfPrVmU31mNq7riiD0f+zVxy8v+FiR0dOT9FbrsUsVibuISBpjerZoZWbtNUak357/vVpz/EZmLvpCnRZKKh6NiVyfZ4u+S2naupo1/TYzXkbAM22nBuh44QIU8xEl0euZtAWiASilZMX1ABAiv9slwreEkJ/XMLc6zsjP1jmPBECnTp1yHRs/sm373CRJ1owNM7NxnKoIo+inXv3OpxIdyPKEL+qP9E7n1BWK6I71Io3MMHbFhtb6RKrlFfV6/RRy7dPzi6tdAADw/fmrBejlAL+MwM+uuA0gixCE/aU/MDNblkW24wIAoqA7DxLfEMSf11z5iuu6DyyfA04LxelUIyJeKOVsP/bPvfqeD3Vbs1qsk77ADFOt2iKOk/vd+uxTiJ4Sr0b6KqHdPJdRaHZV1UIcx2s2IiaCiKNI15qj+0xn/qNEjZczsyxy+laVy+KClM0pCcUF8LyR2wHcDuBwtzv3bISdlwN4hRDyWevpU2Zm266QNvpkEoXTEOLzmrOv1bxzHl50jABmBDBhFs2hnBMvOo5w7BgzP+wFXXV9Ggd9NmNmKtxeG481LQDxaketFtoFABjmulIKcRyvazyEENJvz2deY8/L/NbJ9xLRHzHfbjFz1ov4hVnmn5vixy7cAbXa6PcAfA/A0bA793rHcT4cBIFZ6W7mKs7xGjKO/Y9lWr2l4TVOLvpMYGZGHJmZWUH0GlA0OZm25x59T32kub/bOrWulC8aDwyutqtpBfnjJ1aefPkbMzMzZXbKKPIgUl8LAyJSQWcucxvNt3fnH50n2vcfC4k36xC/+BwLpBQXwCKiWJJY76l+LKQFo/HjRqNxkvNej2XsqF+iUYxrEVHannvkWq/eeGPQmeubcKDIZgNVlKrmNUeFN7j4mBVSMzExkf9BGC8+7ns1xswq6LS019zzvrBz6igR6UI/bjh/riArA0DaGLeP0UGnC9N0OfZGxiwJb5169PmVqvuJNI6NMdz3qp2KZ2sAqGqNBoCNZQNIqZ6w0Vh4ka8og05LV2vNd0Z+6xMn7767QUS6kPrNhB0W1M+6B65hR9b5niwciLQ7/+iLq577JYDdLEsgNrYUJWY21WqVALO3fG/5Qb1JYPPEzQT8C3sj/fZcVnG9VzeeeO7/Djvzv1FInmFmwTytNnIB0jTd1uAH560MBTOrwrvQRMRBd+6tdtX5IoxupHFsiDZeFUFERlgVKIML8ndmVpC+mqNfSBVdiDzbd3OJEUSq25rVruteLqS6NfJbnxbgPyGi72KR5Ba1OaXuXR0KZjtiTry01+/CHRR1Wy8hSdfbVff5QWeejTG82R5k+TJBwAhxaf7OxIpj1LIvEBGZ22+/3WLwRSZLgC3stwkhZBiGBgB5jZFXRX7nlZE//7cs8NeUiulqo3HXcl99kKDTLWidNGg/wxC/iBnX2hXrKiKC35rVIJJbKfvJ73QDQXRF8da6yUYEgJ928cXnMsz5SZKW721lEgIA/Pa8JiLp1twXgdSLQt3OomD+Dknyq0Hi/69GY993gK213uuFwrjacTB3jRDqn4b+3AuUUhdVKvnq1/f9sqXhlhPmmVmYLIbR5pd4UYPQxViNdJDNlzuOV/G73VX94s2Ail1hv9MxAFgIoWylnkWW9yyVxv8COLWfaG97tRXcVjA1NZV3ZZo/caXbHP0cwBBxiCiOOYljjSLUvF3bkkQk4iiGVPLiuN2+GMBPlseeViVdZ/q5EDawmTy0dedEEgCMYQ7C0FhZxmAkZVL04EAijXyTJIkGSBbCNJAOe8aYzGuMKr8z++vMfA+KcEP5+XJCi9Qr8evgrauWtZCnh0AUUbuh7H6XRBMNvKsHgQ3Y0CuIiHHs2OqLo9KIdruPPoEIz4nzINPZQtLNQcRhF1KKA93uY+fS5KQ+fPjwApeLSZXMTNDyJW59xCv6m58J+Re7DkREWaYzpzbiscYhADhy5MiqpOcxEubXscl2NAXucQKh0xCC6A/uvPNOG3mz/DyCCywsGthvnXyu7VR/NfQ7pjR4Z7E5EJGIwkC79dFLLzpv/BARGczMSOC0pFMemDL/Xlk28YYya86iN4jSOGQoeYSZnWMnTjAzk7jzzjttIspas4/+ntcc+cdBp613n5SfWU0BSuQ+e2i8+uhF3flHri+eNCDFFVdckbRnH/s1x/P+WxwGGrvIY5mZmSFmJgl7L+WVcuuSv501UtsBIiEiv6UrTv2t8yceupqIMtGdf/Saqlv9Iozx0iTZVb0Xx8fHBRExm+QAaI0NlSLeYbQuduCPi91CPhEoyzISUijbqd44OzvbVCTEp4nIi6PQ7Jbu/ov2TZP5++/fIy3rUBJ2GHmKxGpfkHHQZcuuvOTRR+99AtGTHhnqhNeBEEKEftfUGvWnsvb/WgAk0iRh2iWEA/kmMRHpIJi9sDpW/7RS9liSR980M2fLXwB0lmWpVMpreCPHkqD1vIcfftjbLdIO5J5KGieGiS5TzLjddZ0J3/e3Lbi1xckhas2+zPJqf2qy6MmqUgeQomY7vUvnFmBg2d6vAritqbO00zn1zFe+cvKHg55znzBWtSqTtPUpRYI/CyEOFFtdOz0xAGCSeICBG5I06UTRY0ZIKfrasBOA0dqAJElJFbB9osiT2nHvh4hEFPiGpDimODCfDbj7brtij6ZJutMP2y5jQD8A8IPtON9U3t15p4sbdNX1ROB3v19r7P0/orZv3yPGmC/Y1Tp2weQAAIcPHy73L7f62h23LjMLWSEB+gQRGQEAgvRfZEmEIYQ8+8LRo0cNEWXb8NpxtcLMrJSSoT/fNSL7JAAIZhZe89y/j8Pgm65XJ16j99RZbAq64jaItf5kvf6ER6enp5WamZnJdzWUeC9AX9zpGT7OwFIKEYfdRILfX6g7Iw4UTzj3vD23dDutb7u1ujwr7dsDZtZVb0SkUfzJavOcu5Ev+MySKKMU6m1Gm7Ox9G0AM7NUSkRBJ1RkHS2knIEiuFWmvbmNPd+Mws7/dOsjcq3WGWfRB5h11W2KLInf74yO3odCyoGlEcV8faTkm6Og27Zsm4qqhrPYIJjZVBxXBt3Ze2uReV+RQrgyG6C4CsLz9v7cpOlbK05dYJf47WcahCAjlSLW9AY691wfhfpe+HzxwaWa8UbGP9htn/qy1xhRZ9XMxmCMyZzaHuV3Wh+ujYzdMj09rZZnea2WbMPMTEFw8p/Fof8Du1IZS5NkVwTDdjuMMcbxPBX683fXmuf82/xBsRMrhHYFkafVzPhDWRj8vrJsEkKYs/p9bTAzK8tirU1i0uwQEfk4trSWqUSv5xxpZla1sfO+6Ldb73RqexQRhpZdeyZCCJFV3bqMwu4f1kbP+d709LSiHk9fX6OrdE48Eb3bb5+83K2PHeq2Tj7un7C7GTBz6tbHrE7rsf/cHD33I7zOkxrX0tMMQE9NTUm3PvbayJ/7Zq05qtbqIfuLCGZOvcaY5bdnP9MY2femoshhTedjTaktirSYiJL5+flXIPC/Xms2r/RbrYzOSjyMMVmtOWaF/vzXvMbDry788XULzNb1SMo6oZGRkblu0LomCcO7vUbzF17imTmtNfeoOGjf5vjpK4iuyMtW+ggn9+UGFsTL8fELH+qG3RclUfzjWvMXl/hcpeyx4qB724OPzP4W7dvXXZ74vxY2UiOpmVmOjV3wQNufe2EaRT+oNfcoZl6/CfrjCKUOD4PO1zrBw9dccsklrY0QDmwwm6skfnz8woeCE60XxpH/da8xZvEvgMQX65TMa+y1Ir/9mZ8/eNtvjY9f3tko4cAmUuiISE9NTcmR/ftn73/g0d+MgtanvOZehbyp7+NyAcVsjBCC3fqICv35/+LURg5edtlL480QDmyy5mZyclLnA4oY4N8JO3P3uF7tHXEUIU2TDdXS73YYY3S1WpUMMkF3/l979b0fKLwU3gzhwBaSRXPjaoiZpVMffWe3036lkLJVazTk48HAMjMzm6zWHJUMPBiH/ou9+t4PTE/njzHeyqb3FhunESNPdVNENNU++dAd7NU+Wmvu/WW/farswHnGBcqMMUYIQW59TCVh98tZMP/6+t79D6630uwX21Ujmk1PT6vG3vPu+slPb/m1yJ9/f9VxheM4osg1PCPAeX/GzKvVhLJsE/vt6ytu4xovJ1xuV3X3tq0qyw1uIkoAvLnbPXmrLSt/7jX2XOa3Zxl5TdOu1fXMnFd018dUGne/r5P0X7nNsdvKxhGrVT5vFtt66xeLKGKeVrXa3lvve+Dh5ySR/6eWXWGvXpfGGM27rFO1MYaNMdqr16Wy7CwKWu998OFTzysIV0S0drOITWDb4yeFns+K27EN4N8FrVOfSYjeV2vueUEWB4jjOEOvXPMhofC7daVSUVbVk0nkfyOMg7eMjJz7HWChvH0gqnFgQatiIUUzMzPSbY7dBuDXwu7c64WQ13uNPRclYRtpmqW8xmOBBwVjjJZSSqc2opLY/3kSdd5VcUb/EgCYpxUwobdTnSzHQH/wIqkv/dr/MXfvvZ/lfXgjkXyj12iMcRYhS7Oh7MMyG0NEwmvskUnkB0nk/9d4tvOfGueff7LIS6FBSfdiDEXKSp1YqJx5AO/yT5z4MMBvIJL/kgkjA5+ExWxVa8KwH6Zx96+iJP7jZp51Vc5rnc7X24eh3tqlygEgieghANcHs7MfgjCvbbX8gfrzWahlIsIvauZ3Vqsj3wUWuioNVJWshv8PxdMa07Khgb4AAAAASUVORK5CYII=";

const BARBEROS = ["Agustín Saragoza", "Tobias Villafañe"];
const ADMIN_NOMBRE = "Alejandra Aguilera";
// Usuarios y claves simples (editable). Admin + cada barbero.
const USUARIOS = {
  "Administración": { clave: "pdc", rol: "admin" },
  "Agustín Saragoza": { clave: "1111", rol: "barbero" },
  "Tobias Villafañe": { clave: "3333", rol: "barbero" },
};
const SERVICIOS = ["Corte", "Corte y Barba"];
const MEDIOS_PAGO = ["Efectivo", "Transferencia", "Posnet", "QR MercadoPago"];
const MEDIOS_PAGO_BARBERO = ["Efectivo", "MercadoPago"]; // a barberos solo estos
const IIBB = 0.03;
const CAJA_INICIAL_EFECTIVO = 10000;
const CAJA_INICIAL_MP = 0;

// Membresías — por ahora solo se vende la mensual (trimestral/anual pausadas)
const TIPOS_PASE = ["Basic Mensual"];
const PASE_CONFIG = {
  "Basic Mensual":   { dias: 30,  cuotas: 1,  montoCuota: 20000 },
  "Plus Trimestral": { dias: 90,  cuotas: 3,  montoCuota: 16500 },
  "Premium Anual":   { dias: 365, cuotas: 12, montoCuota: 16500 },
};

const STORAGE_KEY = "pdc_barberia_cortes";
const PAGOS_KEY   = "pdc_barberia_pagos";
const CIERRES_KEY = "pdc_barberia_cierres";
const PASES_KEY   = "pdc_barberia_pases";
const TURNOS_KEY  = "pdc_barberia_turnos";
const PEND_KEY    = "pdc_barberia_pendientes";
const SESION_KEY  = "pdc_barberia_sesion";
const CLIENTES_KEY = "pdc_barberia_clientes";
const GASTOS_KEY  = "pdc_barberia_gastos";

function billetera(medio) { return medio === "Efectivo" ? "Efectivo" : "MercadoPago"; }
function tieneIIBB(medio) { return medio === "Posnet" || medio === "QR MercadoPago"; }
function netoIngreso(medio, bruto) { return tieneIIBB(medio) ? Math.round(bruto * (1 - IIBB)) : bruto; }
function iibbDe(medio, bruto) { return tieneIIBB(medio) ? bruto - netoIngreso(medio, bruto) : 0; }
function comisionBarbero(servicio, monto = 0, propina = 0) {
  if (servicio === "Corte" || servicio === "Corte y Barba") return Math.round(monto / 2) + propina;
  return propina;
}
function formatFecha(iso) { const d = new Date(iso); return d.toLocaleDateString("es-AR", { day:"2-digit", month:"2-digit", year:"numeric" }); }
function formatHora(iso) { const d = new Date(iso); return d.toLocaleTimeString("es-AR", { hour:"2-digit", minute:"2-digit" }); }
function fmt(n) { return "$" + Math.round(Number(n)).toLocaleString("es-AR"); }
function hoy() { return new Date().toISOString().slice(0, 10); }
function addDias(iso, dias) { const d = new Date(iso); d.setDate(d.getDate() + dias); return d.toISOString(); }
function diasEntre(desde, hasta) { return Math.floor((new Date(hasta) - new Date(desde)) / 86400000); }

// Generar la(s) comisión(es) de un pase. Quedan disponibles para cobrar de inmediato (sin esperar vencimiento).
function generarCuotas(tipo, fechaCompra) {
  const cfg = PASE_CONFIG[tipo];
  const cuotas = [];
  for (let i = 1; i <= cfg.cuotas; i++) {
    cuotas.push({ n: i, monto: cfg.montoCuota, vence: fechaCompra, pagado: 0 });
  }
  return cuotas;
}

const initialForm     = { servicio: "", cliente: "", telefono: "", barbero: "", medioPago: "", monto: "", propina: "" };
const initialPagoForm = { barbero: "", monto: "", medioPago: "", nota: "" };
const initialPaseForm = { cliente: "", telefono: "", barbero: "", tipo: "", monto: "", medioPago: "" };



// Tarjeta de cliente con acciones (historial, agendar, whatsapp)
function ClienteCard({ nombre, telefono, ficha, servicios, abierto, onToggle, onAgendar, onEditar, fmt, formatFecha, waCliente }) {
  return (
    <div style={{ background:"#141414",borderRadius:12,padding:"14px",border:"1px solid #1e1e1e",marginBottom:8 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15,fontWeight:700 }}>{nombre}</div>
          <div style={{ fontSize:12,color:"#888",marginTop:2 }}>{servicios.length} servicio{servicios.length!==1?"s":""}{telefono?` · 📞 ${telefono}`:" · sin teléfono"}</div>
          {ficha && (ficha.barbero || ficha.instagram || ficha.barba) && (
            <div style={{ fontSize:11,color:"#666",marginTop:3,display:"flex",gap:8,flexWrap:"wrap" }}>
              {ficha.barbero && <span>✂️ {ficha.barbero.split(" ")[0]}</span>}
              <span>{ficha.barba?"corte + barba":"solo pelo"}</span>
              {ficha.instagram && <span>📷 {ficha.instagram.replace(/^@/,"")}</span>}
            </div>
          )}
          {ficha && ficha.nota && <div style={{ fontSize:11,color:"#777",marginTop:4,fontStyle:"italic" }}>{ficha.nota}</div>}
        </div>
        {onEditar && <button onClick={onEditar} style={{ background:"transparent",border:"none",color:"#666",fontSize:13,cursor:"pointer",padding:"2px 4px" }}>✏️</button>}
      </div>
      <div style={{ display:"flex",gap:8,marginTop:10,flexWrap:"wrap" }}>
        <button onClick={onToggle} style={{ flex:"1 0 auto",padding:"8px 10px",borderRadius:8,border:"none",background:"#2a2a2a",color:"#f0ede6",fontSize:12,fontWeight:600,cursor:"pointer" }}>{abierto?"Ocultar":"Historial"}</button>
        <button onClick={onAgendar} style={{ flex:"1 0 auto",padding:"8px 10px",borderRadius:8,border:"none",background:"#2a2a2a",color:"#f0ede6",fontSize:12,fontWeight:600,cursor:"pointer" }}>Agendar turno</button>
        {telefono && <a href={waCliente(nombre,telefono)} target="_blank" rel="noopener noreferrer" style={{ flex:"1 0 auto",textAlign:"center",textDecoration:"none",padding:"8px 10px",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12,fontWeight:700 }}>💬 WhatsApp</a>}
      </div>
      {abierto && (
        <div style={{ marginTop:10,borderTop:"1px solid #232323",paddingTop:10 }}>
          {servicios.length===0
            ? <div style={{ fontSize:13,color:"#555" }}>Sin servicios registrados.</div>
            : servicios.map(c=>(
              <div key={c.id} style={{ display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0" }}>
                <span style={{ color:"#aaa" }}>{c.servicio} · {c.barbero.split(" ")[0]}</span>
                <span style={{ color:"#888" }}>{formatFecha(c.fecha)} · {fmt(c.monto)}</span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

// Input de cliente con autocompletado. value = nombre. Al elegir uno guardado, llama onPick(cliente).
// Select genérico (definido fuera de App para no perder foco/teclado al re-renderizar)
function Sel({ field, options, placeholder, value, onChange, errs, sInp }) {
  return (
    <select value={value} onChange={onChange} style={{ ...sInp((errs||{})[field]), color: value?"#f0ede6":"#666", appearance:"none" }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// Modal de confirmación (destructivo por defecto)
function Modal({ title, body, onCancel, onConfirm, confirmLabel="Eliminar" }) {
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:320,width:"100%",border:"1px solid #2a2a2a" }}>
        <div style={{ fontWeight:700,marginBottom:8 }}>{title}</div>
        <div style={{ color:"#aaa",fontSize:13,marginBottom:20 }}>{body}</div>
        <div style={{ display:"flex",gap:10 }}>
          <button onClick={onCancel} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"1px solid #333",background:"transparent",color:"#aaa",cursor:"pointer",fontSize:14 }}>Cancelar</button>
          <button onClick={onConfirm} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"none",background:"#e05c5c",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:700 }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// Ventana flotante para acciones rápidas (se cierra sola al terminar)
function ActionModal({ title, subtitle, onClose, children, zIndex=997 }) {
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex,display:"flex",alignItems:"flex-end",justifyContent:"center" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#161616",borderTopLeftRadius:20,borderTopRightRadius:20,padding:"20px 20px 28px",width:"100%",maxWidth:520,maxHeight:"88vh",overflowY:"auto",border:"1px solid #2a2a2a",borderBottom:"none" }}>
        <div style={{ width:36,height:4,background:"#333",borderRadius:2,margin:"0 auto 16px" }} />
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4 }}>
          <div style={{ fontSize:16,fontWeight:700,color:"#f2efe8" }}>{title}</div>
          <button onClick={onClose} style={{ background:"transparent",border:"none",color:"#666",fontSize:18,cursor:"pointer",lineHeight:1 }}>✕</button>
        </div>
        {subtitle && <div style={{ fontSize:11,color:"#666",marginBottom:16 }}>{subtitle}</div>}
        {children}
      </div>
    </div>
  );
}

// Formulario de ficha de cliente reutilizable (alta, ficha-tras-corte-nuevo, edición)
function ClienteFichaForm({ clienteForm, setClienteForm, errors, setErrors, sInp, lockNombre, onSave, saveLabel, barberos, showBarbero }) {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      {lockNombre ? (
        <div style={{ ...sInp(false), color:"#f0ede6", display:"flex", alignItems:"center" }}>{clienteForm.nombre}</div>
      ) : (
        <input placeholder="Nombre completo" value={clienteForm.nombre} style={sInp(errors.nombre)} onChange={e=>{setClienteForm(f=>({...f,nombre:e.target.value}));setErrors(er=>({...er,nombre:false}));}} />
      )}
      <input type="tel" placeholder="WhatsApp / Teléfono" value={clienteForm.telefono} style={sInp(errors.telefono)} onChange={e=>{setClienteForm(f=>({...f,telefono:e.target.value}));setErrors(er=>({...er,telefono:false}));}} />
      <div style={{ display:"flex",gap:8 }}>
        {[{v:false,l:"Solo pelo"},{v:true,l:"Pelo y barba"}].map(o=>(
          <button key={o.l} onClick={()=>setClienteForm(f=>({...f,barba:o.v}))} style={{ flex:1,padding:"10px 0",borderRadius:8,border:`1.5px solid ${clienteForm.barba===o.v?"#f2efe8":"#2a2a2a"}`,background:clienteForm.barba===o.v?"#1f1d18":"#181818",color:clienteForm.barba===o.v?"#f2efe8":"#888",fontSize:13,fontWeight:600,cursor:"pointer" }}>{o.l}</button>
        ))}
      </div>
      {showBarbero && (
        <select value={clienteForm.barbero} onChange={e=>setClienteForm(f=>({...f,barbero:e.target.value}))} style={{ ...sInp(false),color:clienteForm.barbero?"#f0ede6":"#666",appearance:"none" }}>
          <option value="">Barbero asignado (opcional)</option>
          {barberos.map(b=><option key={b} value={b}>{b}</option>)}
        </select>
      )}
      <input placeholder="Instagram (opcional, ej: @juan)" value={clienteForm.instagram} style={sInp(false)} onChange={e=>setClienteForm(f=>({...f,instagram:e.target.value}))} />
      <textarea placeholder="Nota (opcional)" value={clienteForm.nota} rows={2} style={{ ...sInp(false),resize:"vertical" }} onChange={e=>setClienteForm(f=>({...f,nota:e.target.value}))} />
      <button onClick={onSave} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>{saveLabel}</button>
      {Object.values(errors).some(Boolean) && <div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá nombre y teléfono.</div>}
    </div>
  );
}

function ClienteInput({ value, onChange, onPick, clientes, err, sInp, placeholder="Nombre del cliente" }) {
  const [focus, setFocus] = useState(false);
  const q = (value||"").trim().toLowerCase();
  const matches = q.length >= 1
    ? clientes.filter(c => c.nombre.toLowerCase().includes(q) && c.nombre.toLowerCase() !== q).slice(0, 5)
    : [];
  const exacto = clientes.find(c => c.nombre.toLowerCase() === q);
  return (
    <div style={{ position:"relative" }}>
      <input placeholder={placeholder} value={value} style={sInp(err)}
        onChange={e=>onChange(e.target.value)}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setTimeout(()=>setFocus(false),150)} />
      {exacto && <div style={{ position:"absolute",right:10,top:11,fontSize:14,color:"#7ec87e" }}>✓</div>}
      {focus && matches.length>0 && (
        <div style={{ position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#1c1c1c",border:"1px solid #2a2a2a",borderRadius:8,zIndex:50,overflow:"hidden",boxShadow:"0 6px 20px rgba(0,0,0,0.5)" }}>
          {matches.map((c,i)=>(
            <button key={i} onClick={()=>{ onChange(c.nombre); onPick && onPick(c); setFocus(false); }} style={{ display:"block",width:"100%",textAlign:"left",background:"transparent",border:"none",borderBottom:i<matches.length-1?"1px solid #232323":"none",padding:"10px 12px",cursor:"pointer",color:"#f0ede6" }}>
              <div style={{ fontSize:14 }}>{c.nombre}</div>
              {c.telefono && <div style={{ fontSize:11,color:"#777" }}>📞 {c.telefono}</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cortes, setCortes]   = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); } catch { return []; } });
  const [pagos, setPagos]     = useState(() => { try { return JSON.parse(localStorage.getItem(PAGOS_KEY)||"[]"); } catch { return []; } });
  const [cierres, setCierres] = useState(() => { try { return JSON.parse(localStorage.getItem(CIERRES_KEY)||"[]"); } catch { return []; } });
  const [pases, setPases]     = useState(() => { try { return JSON.parse(localStorage.getItem(PASES_KEY)||"[]"); } catch { return []; } });
  const [clientes, setClientes] = useState(() => { try { return JSON.parse(localStorage.getItem(CLIENTES_KEY)||"[]"); } catch { return []; } });
  const [gastos, setGastos]     = useState(() => { try { return JSON.parse(localStorage.getItem(GASTOS_KEY)||"[]"); } catch { return []; } });
  const [turnos, setTurnos]   = useState(() => { try { return JSON.parse(localStorage.getItem(TURNOS_KEY)||"[]"); } catch { return []; } });
  const [pendientes, setPendientes] = useState(() => { try { return JSON.parse(localStorage.getItem(PEND_KEY)||"[]"); } catch { return []; } });
  const [sesion, setSesion]   = useState(() => { try { return JSON.parse(localStorage.getItem(SESION_KEY)||"null"); } catch { return null; } });
  const [loginUser, setLoginUser] = useState("");
  const [loginClave, setLoginClave] = useState("");
  const [loginError, setLoginError] = useState("");

  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [vista, setVista]   = useState("inicio");
  const [toast, setToast]   = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [modoFiltro, setModoFiltro]   = useState("dia");
  const [filtroDia, setFiltroDia]     = useState(hoy());
  const [filtroDesde, setFiltroDesde] = useState(hoy());
  const [filtroHasta, setFiltroHasta] = useState(hoy());

  const [pagoForm, setPagoForm]           = useState(initialPagoForm);
  const [pagoErrors, setPagoErrors]       = useState({});
  const [barberoDetalle, setBarberoDetalle] = useState(null);
  const [confirmDeletePago, setConfirmDeletePago] = useState(null);
  const [confirmDeleteGasto, setConfirmDeleteGasto] = useState(null);

  const [clienteDetalle, setClienteDetalle] = useState(null);
  const [clienteBuscar, setClienteBuscar] = useState("");
  const [mostrarNuevoCliente, setMostrarNuevoCliente] = useState(false);
  const [clienteForm, setClienteForm] = useState({ nombre:"", telefono:"", barba:false, barbero:"", instagram:"", nota:"" });
  const [clienteFormErrors, setClienteFormErrors] = useState({});
  const [clienteNuevo, setClienteNuevo] = useState(null); // { nombre, telefono, tipo, continuar }
  const [clienteNuevoPaso, setClienteNuevoPaso] = useState("decision"); // "decision" | "ficha"
  const [editarCliente, setEditarCliente] = useState(null); // nombre del cliente en edición, o null

  // Membresías
  const [paseForm, setPaseForm]       = useState(initialPaseForm);
  const [paseErrors, setPaseErrors]   = useState({});
  const [paseDetalle, setPaseDetalle] = useState(null);
  const [confirmDeletePase, setConfirmDeletePase] = useState(null);
  const [visitaBarbero, setVisitaBarbero] = useState({}); // {paseId: barbero}
  const [visitaPropina, setVisitaPropina] = useState({}); // {paseId: monto}
  const [visitaMedio, setVisitaMedio]     = useState({}); // {paseId: medio}

  // Pago de cuota modal
  const [cuotaPago, setCuotaPago] = useState(null); // {paseId, n, restante}
  const [cuotaMonto, setCuotaMonto] = useState("");
  const [cuotaMedio, setCuotaMedio] = useState("");

  // Turnos
  const [turnoForm, setTurnoForm] = useState({ fecha: hoy(), hora: "", cliente: "", telefono: "", barba: false, barbero: "", nota: "" });
  const [turnoErrors, setTurnoErrors] = useState({});
  const [turnoModo, setTurnoModo] = useState("dia"); // "dia" | "semana"
  const [revisarCortesModo, setRevisarCortesModo] = useState("dia"); // "dia" | "semana"
  const [periodoResumen, setPeriodoResumen] = useState("hoy"); // "hoy" | "semana" | "mes"
  const [modalBarbero, setModalBarbero] = useState(null); // null | "corte" | "turno" | "membresia" | "cliente"
  const [modalAdmin, setModalAdmin] = useState(null); // null | "corte" | "turno" | "membresia" | "pago"
  const [turnoFiltroBarbero, setTurnoFiltroBarbero] = useState("Todos");
  const [turnoFecha, setTurnoFecha] = useState(hoy());
  const [confirmDeleteTurno, setConfirmDeleteTurno] = useState(null);

// ==================== SUPABASE ====================

const [supabaseLoaded, setSupabaseLoaded] = useState(false);
const ignorarProximoGuardado = useRef(false);

// Cargar estado global desde Supabase al iniciar
useEffect(() => {
  let activo = true;

  const cargarEstado = async () => {
    try {
      const { data, error } = await supabase
        .from("estado")
        .select("data")
        .eq("id", "global")
        .single();

      if (error) throw error;

      if (activo && data?.data) {
        const estado = data.data;

        // Los datos vienen de Supabase.
        // No debemos volver a guardarlos inmediatamente.
        ignorarProximoGuardado.current = true;

        if (Array.isArray(estado.cortes)) setCortes(estado.cortes);
        if (Array.isArray(estado.pagos)) setPagos(estado.pagos);
        if (Array.isArray(estado.cierres)) setCierres(estado.cierres);
        if (Array.isArray(estado.pases)) setPases(estado.pases);
        if (Array.isArray(estado.clientes)) setClientes(estado.clientes);
        if (Array.isArray(estado.gastos)) setGastos(estado.gastos);
        if (Array.isArray(estado.turnos)) setTurnos(estado.turnos);
        if (Array.isArray(estado.pendientes)) setPendientes(estado.pendientes);
      }

      if (activo) {
        setSupabaseLoaded(true);
      }
    } catch (error) {
      console.error("Error cargando Supabase:", error);

      if (activo) {
        setSupabaseLoaded(true);
      }
    }
  };

  cargarEstado();

  return () => {
    activo = false;
  };
}, []);


// Guardar cambios locales en Supabase
useEffect(() => {
  if (!supabaseLoaded) return;

  // Si el cambio vino de Supabase, no volver a guardarlo.
  if (ignorarProximoGuardado.current) {
    ignorarProximoGuardado.current = false;
    return;
  }

  const guardarEstado = async () => {
    try {
      const data = {
        cortes,
        pagos,
        cierres,
        pases,
        clientes,
        gastos,
        turnos,
        pendientes,
      };

      const { error } = await supabase
        .from("estado")
        .update({
          data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", "global");

      if (error) {
        console.error("Error guardando en Supabase:", error);
      }
    } catch (error) {
      console.error("Error guardando estado:", error);
    }
  };

  guardarEstado();
}, [
  cortes,
  pagos,
  cierres,
  pases,
  clientes,
  gastos,
  turnos,
  pendientes,
]);


// Escuchar cambios realizados desde otros dispositivos
useEffect(() => {
  const channel = supabase
    .channel("estado-global")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "estado",
        filter: "id=eq.global",
      },
      (payload) => {
        const estado = payload.new?.data;

        if (!estado) return;

        // El cambio viene de Supabase.
        // No debemos volver a enviarlo.
        ignorarProximoGuardado.current = true;

        if (Array.isArray(estado.cortes)) setCortes(estado.cortes);
        if (Array.isArray(estado.pagos)) setPagos(estado.pagos);
        if (Array.isArray(estado.cierres)) setCierres(estado.cierres);
        if (Array.isArray(estado.pases)) setPases(estado.pases);
        if (Array.isArray(estado.clientes)) setClientes(estado.clientes);
        if (Array.isArray(estado.gastos)) setGastos(estado.gastos);
        if (Array.isArray(estado.turnos)) setTurnos(estado.turnos);
        if (Array.isArray(estado.pendientes)) setPendientes(estado.pendientes);
      }
    )
    .subscribe((status) => {
      console.log("Supabase Realtime:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  // ── CORTES ──
  function validate() {
    const e = {};
    if (!form.servicio) e.servicio = true;
    if (!form.cliente.trim()) e.cliente = true;
    if (!form.barbero) e.barbero = true;
    if (!form.medioPago) e.medioPago = true;
    if (!form.monto || isNaN(Number(form.monto)) || Number(form.monto) <= 0) e.monto = true;
    return e;
  }
  function guardarCliente(nombre, telefono) {
  const n = (nombre || "").trim();
  if (!n) return;

  const tel = (telefono || "").trim();

  setClientes(prev => {
    const idx = prev.findIndex(
      c => c.nombre.toLowerCase() === n.toLowerCase()
    );

    if (idx >= 0) {
      // Si ya existe, actualizar teléfono si llegó uno nuevo
      // y conservar el barbero que ya tenía.
      if (tel && !prev[idx].telefono) {
        const cp = [...prev];
        cp[idx] = {
          ...cp[idx],
          telefono: tel
        };
        return cp;
      }

      return prev;
    }

    // Cliente nuevo:
    // queda asignado al barbero que está cargándolo.
    return [
      ...prev,
      {
        nombre: n,
        telefono: tel,
        barbero: sesion?.nombre || ""
      }
    ];
  });
}
  }
  // ¿Existe ficha guardada para este nombre?
  function existeCliente(nombre) {
    const n = (nombre||"").trim().toLowerCase();
    if (!n) return true; // sin nombre, no corresponde preguntar (la validación normal ya lo exige)
    return clientes.some(c => c.nombre.toLowerCase() === n);
  }
  // Ficha completa de un cliente (nombre, teléfono, tipo de corte habitual, barbero asignado, instagram, nota)
  function fichaDeCliente(nombre) {
    const c = clientes.find(x => x.nombre.toLowerCase() === (nombre||"").toLowerCase());
    return { telefono:"", barba:false, barbero:"", instagram:"", nota:"", ...(c||{}) };
  }
  // Alta / edición manual completa de un cliente (botón + o Editar)
  function upsertClienteFicha(data) {
    const n = (data.nombre||"").trim();
    if (!n) return;
    setClientes(prev => {
      const idx = prev.findIndex(c => c.nombre.toLowerCase() === n.toLowerCase());
      const registro = { nombre:n, telefono:(data.telefono||"").trim(), barba:!!data.barba, barbero:data.barbero||"", instagram:(data.instagram||"").trim(), nota:(data.nota||"").trim() };
      if (idx >= 0) { const cp=[...prev]; cp[idx] = { ...cp[idx], ...registro }; return cp; }
      return [...prev, registro];
    });
  }
  function handleAgregarClienteManual() {
    const e = {};
    if (!clienteForm.nombre.trim()) e.nombre = true;
    if (!clienteForm.telefono.trim()) e.telefono = true;
    if (Object.keys(e).length) { setClienteFormErrors(e); return; }
    upsertClienteFicha(clienteForm);
    setClienteForm({ nombre:"", telefono:"", barba:false, barbero:"", instagram:"", nota:"" });
    setClienteFormErrors({});
    setMostrarNuevoCliente(false);
    setToast("Cliente guardado");
  }
  // Verifica si el cliente escrito ya tiene ficha; si no, pregunta antes de continuar con la acción.
  function conVerificacionCliente(nombre, telefono, tipo, continuar) {
    const n = (nombre||"").trim();
    if (!n || existeCliente(n)) { continuar(); return; }
    setClienteNuevo({ nombre: n, telefono: (telefono||"").trim(), tipo, continuar });
    setClienteNuevoPaso("decision");
  }
  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const propina = form.propina ? Number(form.propina) : 0;
    setCortes(prev => [{
      id: Date.now(), fecha: new Date().toISOString(),
      servicio: form.servicio, cliente: form.cliente.trim(),
      barbero: form.barbero, medioPago: form.medioPago,
      monto: Number(form.monto), propina,
      comision: comisionBarbero(form.servicio, Number(form.monto), propina),
    }, ...prev]);
    setForm(initialForm); setErrors({});
    if (modalAdmin === "corte") setModalAdmin(null);
    setToast("¡Corte registrado!");
  }
  function handleDelete(id) { setCortes(prev => prev.filter(c => c.id !== id)); setConfirmDelete(null); setToast("Corte eliminado"); }
  function handleDeletePago(id) {
    const pago = pagos.find(p => p.id === id);
    if (pago && pago.tipo === "membresia" && pago.paseId != null) {
      setPases(prev => prev.map(p => p.id === pago.paseId
        ? { ...p, cuotas: p.cuotas.map(c => c.n === pago.cuotaN ? { ...c, pagado: Math.max(0, c.pagado - pago.monto) } : c) }
        : p));
    }
    setPagos(prev => prev.filter(p => p.id !== id));
    setConfirmDeletePago(null); setToast("Pago eliminado");
  }
  function handleRegistrarPago() {
    const e = {};
    if (!pagoForm.barbero) e.barbero = true;
    if (!pagoForm.medioPago) e.medioPago = true;
    if (!pagoForm.monto || isNaN(Number(pagoForm.monto)) || Number(pagoForm.monto) <= 0) e.monto = true;
    if (Object.keys(e).length) { setPagoErrors(e); return; }
    setPagos(prev => [{
      id: Date.now(), fecha: new Date().toISOString(),
      barbero: pagoForm.barbero, monto: Number(pagoForm.monto),
      medioPago: pagoForm.medioPago, nota: pagoForm.nota.trim(),
      tipo: "corte",
    }, ...prev]);
    setPagoForm(initialPagoForm); setPagoErrors({});
    if (modalAdmin === "pago") setModalAdmin(null);
    setToast("Pago registrado");
  }


  // ── SESIÓN ──
  function handleLogin() {
    const u = USUARIOS[loginUser];
    if (!u) { setLoginError("Elegí un usuario"); return; }
    if (loginClave !== u.clave) { setLoginError("Clave incorrecta"); return; }
    setSesion({ usuario: loginUser, rol: u.rol });
    setLoginUser(""); setLoginClave(""); setLoginError("");
    setVista(u.rol === "admin" ? "inicio" : "barbero");
  }
  function handleLogout() { setSesion(null); setVista("turnos"); }
  const esAdmin = sesion?.rol === "admin";
  const barberoActivo = sesion?.rol === "barbero" ? sesion.usuario : null;

  // ── APROBACIONES ──
  function solicitarCorte(data) {
    setPendientes(prev => [{ id: Date.now(), kind: "corte", solicitante: barberoActivo, fecha: new Date().toISOString(), data }, ...prev]);
    setToast("Corte enviado a aprobación");
  }
  function solicitarMembresia(data) {
    setPendientes(prev => [{ id: Date.now(), kind: "membresia", solicitante: barberoActivo, fecha: new Date().toISOString(), data }, ...prev]);
    setToast("Membresía enviada a aprobación");
  }
  function aprobarPendiente(id) {
    const p = pendientes.find(x => x.id === id);
    if (!p) return;
    if (p.kind === "corte") {
      const f = p.data;
      const propina = f.propina ? Number(f.propina) : 0;
      setCortes(prev => [{ id: Date.now(), fecha: new Date().toISOString(), servicio: f.servicio, cliente: f.cliente, barbero: f.barbero, medioPago: f.medioPago, monto: Number(f.monto), propina, comision: comisionBarbero(f.servicio, Number(f.monto), propina) }, ...prev]);
    } else if (p.kind === "membresia") {
      const d = p.data;
      const fechaCompra = new Date().toISOString();
      setPases(prev => [{ id: Date.now(), cliente: d.cliente, barbero: d.barbero, tipo: d.tipo, fechaCompra, vence: addDias(fechaCompra, PASE_CONFIG[d.tipo].dias), monto: Number(d.monto), medioPago: d.medioPago, visitas: [], cuotas: generarCuotas(d.tipo, fechaCompra) }, ...prev]);
    }
    setPendientes(prev => prev.filter(x => x.id !== id));
    setToast("Aprobado");
  }
  function rechazarPendiente(id) { setPendientes(prev => prev.filter(x => x.id !== id)); setToast("Rechazado"); }

  // ── TURNOS ──
  function handleAgregarTurno() {
    const e = {};
    if (!turnoForm.fecha) e.fecha = true;
    if (!turnoForm.hora) e.hora = true;
    if (!turnoForm.cliente.trim()) e.cliente = true;
    if (!turnoForm.telefono.trim()) e.telefono = true;
    if (!turnoForm.barbero) e.barbero = true;
    if (Object.keys(e).length) { setTurnoErrors(e); return; }
    setTurnos(prev => [...prev, {
      id: Date.now(), fecha: turnoForm.fecha, hora: turnoForm.hora,
      cliente: turnoForm.cliente.trim(), telefono: turnoForm.telefono.trim(),
      barba: turnoForm.barba, barbero: turnoForm.barbero, nota: turnoForm.nota.trim(),
    }]);
    guardarCliente(turnoForm.cliente, turnoForm.telefono);
    setTurnoForm({ fecha: turnoForm.fecha, hora: "", cliente: "", telefono: "", barba: false, barbero: barberoActivo || "", nota: "" });
    setTurnoErrors({});
    if (modalAdmin === "turno") setModalAdmin(null);
    if (modalBarbero === "turno") setModalBarbero(null);
    setToast("Turno agendado");
  }
  function handleDeleteTurno(id) { setTurnos(prev => prev.filter(t => t.id !== id)); setConfirmDeleteTurno(null); setToast("Turno eliminado"); }
  function rangoSemana(fechaISO) {
    const d = new Date(fechaISO + "T12:00:00");
    const day = (d.getDay()+6)%7; // lunes=0
    const lunes = new Date(d); lunes.setDate(d.getDate()-day);
    const dom = new Date(lunes); dom.setDate(lunes.getDate()+6);
    return { desde: lunes.toISOString().slice(0,10), hasta: dom.toISOString().slice(0,10) };
  }
  // ¿Una fecha ISO cae dentro de "hoy" | "semana" | "mes"?
  function fechaEnPeriodo(fechaISO, periodo) {
    const f = fechaISO.slice(0,10);
    const h = hoy();
    if (periodo === "hoy") return f === h;
    if (periodo === "semana") { const { desde, hasta } = rangoSemana(h); return f >= desde && f <= hasta; }
    if (periodo === "mes") return f.slice(0,7) === h.slice(0,7);
    return true;
  }
  // Filtra una lista de items (con campo fecha ISO) según "hoy" | "semana" | "mes"
  function filtrarPorPeriodo(lista, periodo) {
    return lista.filter(x => fechaEnPeriodo(x.fecha, periodo));
  }
  // Estadísticas del negocio para un período: dinero, cortes, clientes nuevos y recurrentes
  function statsPeriodo(periodo) {
    const cortesPeriodo = cortes.filter(c => fechaEnPeriodo(c.fecha, periodo));
    const pasesPeriodo = pases.filter(p => fechaEnPeriodo(p.fechaCompra, periodo));
    const dinero = cortesPeriodo.reduce((a,c)=>a+c.monto+c.propina,0) + pasesPeriodo.reduce((a,p)=>a+p.monto,0);
    const comisiones = cortesPeriodo.reduce((a,c)=>a+(c.comision||0),0) + pasesPeriodo.reduce((a,p)=>a+p.cuotas.reduce((s,cu)=>s+cu.monto,0),0);
    const neto = dinero - comisiones;
    const clientesEnPeriodo = [...new Set(cortesPeriodo.map(c=>c.cliente))];
    let nuevos = 0;
    clientesEnPeriodo.forEach(nombre => {
      const propios = cortes.filter(c => c.cliente === nombre);
      const primera = propios.reduce((min,c)=> c.fecha < min ? c.fecha : min, propios[0].fecha);
      if (fechaEnPeriodo(primera, periodo)) nuevos++;
    });
    return { dinero, neto, cortes: cortesPeriodo.length, clientesTotal: clientesEnPeriodo.length, nuevos, recurrentes: clientesEnPeriodo.length - nuevos };
  }
  // Horas hasta el turno (para alerta 48hs)
  function horasHasta(fecha, hora) {
    const dt = new Date(`${fecha}T${hora || "00:00"}:00`);
    return (dt - new Date()) / 3600000;
  }
  // Arma link de WhatsApp con mensaje ameno
  function soloDigitos(tel) { const t=(tel||"").replace(/[^\d]/g,""); return t.startsWith("54")?t:"54"+t; }
  function waLink(t) {
    const num = soloDigitos(t.telefono);
    const d = new Date(`${t.fecha}T12:00:00`);
    const dia = d.toLocaleDateString("es-AR", { weekday:"long", day:"2-digit", month:"long" });
    const msg = `¡Hola ${t.cliente}! 💈 Te recordamos tu turno en PDC Barbería el ${dia} a las ${t.hora} con ${t.barbero.split(" ")[0]}. ¡Te esperamos para dejarte impecable! Si no podés venir, avisanos así liberamos el lugar. 🙌`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }
  // WhatsApp ameno genérico para un cliente
  function waCliente(nombre, telefono) {
    const num = soloDigitos(telefono);
    const msg = `¡Hola ${nombre}! 💈 Te escribimos de PDC Barbería. ¿Cómo andás? Cuando quieras coordinar tu próximo turno avisanos. ¡Te esperamos! 🙌`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }
  // Teléfono conocido de un cliente (desde la libreta o sus turnos)
  function telDeCliente(nombre) {
    const c = clientes.find(x => x.nombre.toLowerCase() === (nombre||"").toLowerCase());
    if (c && c.telefono) return c.telefono;
    const t = turnos.find(x => x.cliente.toLowerCase() === (nombre||"").toLowerCase() && x.telefono);
    return t ? t.telefono : "";
  }
  // Historial de servicios (cortes) de un cliente por nombre
  function serviciosDeCliente(nombre) {
    return cortes.filter(c => c.cliente.toLowerCase() === (nombre||"").toLowerCase());
  }
  // Precargar agendar turno con un cliente
  function agendarParaCliente(nombre, telefono) {
    setTurnoForm(f => ({ ...f, cliente: nombre, telefono: telefono || telDeCliente(nombre) }));
    setVista(barberoActivo ? "bcargar" : "turnos");
    setToast("Cargá la fecha y hora del turno");
  }
  // Precargar un turno en la pestaña Corte
  function turnoACorte(t) {
    setForm(f => ({ ...f, cliente: t.cliente, telefono: t.telefono || "", barbero: t.barbero, servicio: t.barba ? "Corte y Barba" : "Corte" }));
    setVista("inicio");
    setModalAdmin("corte");
    setToast("Datos precargados en Cargar servicio");
  }

  // ── MEMBRESÍAS ──
  function validatePase() {
    const e = {};
    if (!paseForm.cliente.trim()) e.cliente = true;
    if (!paseForm.telefono.trim()) e.telefono = true;
    if (!paseForm.barbero) e.barbero = true;
    if (!paseForm.tipo) e.tipo = true;
    if (!paseForm.medioPago) e.medioPago = true;
    if (!paseForm.monto || isNaN(Number(paseForm.monto)) || Number(paseForm.monto) <= 0) e.monto = true;
    return e;
  }
  function handleVenderPase() {
    const e = validatePase();
    if (Object.keys(e).length) { setPaseErrors(e); return; }
    const fechaCompra = new Date().toISOString();
    setPases(prev => [{
      id: Date.now(), cliente: paseForm.cliente.trim(), barbero: paseForm.barbero,
      tipo: paseForm.tipo, fechaCompra,
      vence: addDias(fechaCompra, PASE_CONFIG[paseForm.tipo].dias),
      monto: Number(paseForm.monto), medioPago: paseForm.medioPago,
      visitas: [], cuotas: generarCuotas(paseForm.tipo, fechaCompra),
    }, ...prev]);
    setPaseForm(initialPaseForm); setPaseErrors({});
    if (modalAdmin === "membresia") setModalAdmin(null);
    setToast("Membresía vendida");
  }
  function handleDeletePase(id) {
    setPases(prev => prev.filter(p => p.id !== id));
    setConfirmDeletePase(null); setPaseDetalle(null); setToast("Membresía eliminada");
  }
  function handleRegistrarVisita(paseId) {
    const pase = pases.find(p => p.id === paseId);
    const barbero = visitaBarbero[paseId] || pase?.barbero;
    if (!barbero) { setToast("Elegí el barbero que atendió"); return; }
    const propina = Number(visitaPropina[paseId]) || 0;
    const medio = propina > 0 ? (visitaMedio[paseId] || "Efectivo") : null;
    setPases(prev => prev.map(p => p.id === paseId
      ? { ...p, visitas: [...p.visitas, { fecha: new Date().toISOString(), barbero, propina, medioPropina: medio }] }
      : p));
    setVisitaPropina(v => ({ ...v, [paseId]: "" }));
    setToast("Visita registrada");
  }
  function handlePagarCuota() {
    if (!cuotaPago) return;
    const monto = Number(cuotaMonto);
    if (!monto || monto <= 0) { setToast("Ingresá un monto válido"); return; }
    if (!cuotaMedio) { setToast("Elegí el medio de pago"); return; }
    const pase = pases.find(p => p.id === cuotaPago.paseId);
    // registrar pago al barbero
    setPagos(prev => [{
      id: Date.now(), fecha: new Date().toISOString(),
      barbero: pase.barbero, monto, medioPago: cuotaMedio,
      nota: `Cuota ${cuotaPago.n} · ${pase.tipo} · ${pase.cliente}`,
      tipo: "membresia", paseId: cuotaPago.paseId, cuotaN: cuotaPago.n,
    }, ...prev]);
    // actualizar cuota
    setPases(prev => prev.map(p => p.id === cuotaPago.paseId
      ? { ...p, cuotas: p.cuotas.map(c => c.n === cuotaPago.n ? { ...c, pagado: c.pagado + monto } : c) }
      : p));
    setCuotaPago(null); setCuotaMonto(""); setCuotaMedio("");
    setToast("Cuota pagada");
  }

  // ── COMISIONES por barbero (cortes + membresías) ──
  function propinasVisitasBarbero(b) {
    let total = 0;
    pases.forEach(p => p.visitas.forEach(v => { if (v.barbero === b) total += (v.propina || 0); }));
    return total;
  }
  function comisionCortesBarbero(b) {
    const totalC = cortes.filter(c => c.barbero === b).reduce((a, c) => a + (c.comision || 0), 0);
    const propVis = propinasVisitasBarbero(b);
    const pagadoC = pagos.filter(p => p.barbero === b && p.tipo === "corte").reduce((a, p) => a + p.monto, 0);
    const total = totalC + propVis;
    return { total, pagado: pagadoC, pendiente: total - pagadoC };
  }
  function cuotasBarbero(b) {
    // todas las cuotas de pases cuyo titular es b
    const lista = [];
    pases.filter(p => p.barbero === b).forEach(p => {
      p.cuotas.forEach(c => lista.push({ ...c, paseId: p.id, cliente: p.cliente, tipo: p.tipo }));
    });
    return lista;
  }
  function comisionMembresiaBarbero(b) {
    const cuotas = cuotasBarbero(b);
    const today = new Date().toISOString();
    let vencidoPendiente = 0, totalPendiente = 0;
    cuotas.forEach(c => {
      const rest = c.monto - c.pagado;
      if (rest > 0) {
        totalPendiente += rest;
        if (c.vence <= today) vencidoPendiente += rest;
      }
    });
    return { totalPendiente, vencidoPendiente, cuotas };
  }

  // ── Historial cortes ──
  const cortesHistorial = cortes.filter(c => {
    const f = c.fecha.slice(0, 10);
    return modoFiltro === "dia" ? f === filtroDia : f >= filtroDesde && f <= filtroHasta;
  });
  const totalH = cortesHistorial.reduce((a,c)=>a+c.monto+c.propina,0);
  const totalPropinasH = cortesHistorial.reduce((a,c)=>a+c.propina,0);
  const totalServiciosH = cortesHistorial.reduce((a,c)=>a+c.monto,0);
  const porBarberoH = BARBEROS.map(b => {
    const cc = cortesHistorial.filter(c => c.barbero === b);
    return { barbero:b, cantidad:cc.length, total:cc.reduce((a,c)=>a+c.monto,0), propinas:cc.reduce((a,c)=>a+c.propina,0), comisiones:cc.reduce((a,c)=>a+(c.comision||0),0) };
  }).filter(b => b.cantidad > 0);
  const labelFiltro = modoFiltro==="dia"
    ? (filtroDia===hoy()?"Hoy":formatFecha(filtroDia+"T12:00:00"))
    : `${formatFecha(filtroDesde+"T12:00:00")} → ${formatFecha(filtroHasta+"T12:00:00")}`;

  function enRango(iso) {
    const f = iso.slice(0,10);
    return modoFiltro === "dia" ? f === filtroDia : f >= filtroDesde && f <= filtroHasta;
  }
  // Movimientos unificados: cortes, ventas de pases, pagos a barberos
  const movimientos = [
    ...cortes.filter(c=>enRango(c.fecha)).map(c=>({ tipo:"corte", fecha:c.fecha, id:"c"+c.id, data:c })),
    ...pases.filter(p=>enRango(p.fechaCompra)).map(p=>({ tipo:"pase", fecha:p.fechaCompra, id:"v"+p.id, data:p })),
    ...pagos.filter(p=>enRango(p.fecha)).map(p=>({ tipo:"pago", fecha:p.fecha, id:"p"+p.id, data:p })),
    ...gastos.filter(g=>enRango(g.fecha)).map(g=>({ tipo:"gasto", fecha:g.fecha, id:"g"+g.id, data:g })),
  ].sort((a,b)=>b.fecha.localeCompare(a.fecha));

  function handleDeleteGasto(id) { setGastos(prev => prev.filter(g => g.id !== id)); setConfirmDeleteGasto(null); setToast("Gasto eliminado"); }

  // ── styles ──
  const sInp = (err) => ({ width:"100%", padding:"10px 12px", borderRadius:8, border:`1.5px solid ${err?"#e05c5c":"#2a2a2a"}`, background:"#181818", color:"#f0ede6", fontSize:15, outline:"none", boxSizing:"border-box", fontFamily:"inherit" });

  const pendCount = pendientes.length;
  // Estructura de módulos (admin). Cada submódulo apunta a una "vista".
  const MODULOS = esAdmin ? [
    { id:"in",   label:"Inicio",              subs:[ {v:"inicio",label:"Inicio"} ] },
    { id:"cp",   label:"Clientes & Membresías", subs:[ {v:"clientes",label:"Clientes"}, {v:"membresias",label:"Membresías"} ] },
    { id:"cc",   label:"Pagos",      subs:[ {v:"comisiones",label:"Pago a barberos"}, {v:"historial",label:"Historial"} ] },
  ] : [
    { id:"mp",   label:"Mi panel", subs:[ {v:"barbero",label:"Inicio"} ] },
  ];
  const moduloDe = v => MODULOS.find(m => m.subs.some(s => s.v === v)) || MODULOS[0];
  const moduloActivo = moduloDe(vista);

  // ── LOGIN ──
  if (!sesion) {
    return (
      <div style={{ minHeight:"100vh",background:"#0f0f0f",color:"#f0ede6",fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
        <div style={{ width:"100%",maxWidth:340 }}>
          <div style={{ textAlign:"center",marginBottom:28 }}>
            <img src={LOGO} alt="PDC" style={{ height:90,width:"auto",margin:"0 auto 12px",display:"block" }} />
            <div style={{ fontSize:24,fontWeight:700,letterSpacing:2,color:"#f2efe8" }}>PDC BARBERÍA</div>
            <div style={{ fontSize:11,color:"#666",letterSpacing:1.5,marginTop:4,textTransform:"uppercase" }}>1 Reyes 8:29</div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <select value={loginUser} onChange={e=>{setLoginUser(e.target.value);setLoginError("");}} style={{ ...sInp(false),color:loginUser?"#f0ede6":"#666",appearance:"none" }}>
              <option value="">¿Quién sos?</option>
              {Object.keys(USUARIOS).map(u=><option key={u} value={u}>{u}</option>)}
            </select>
            <input type="password" placeholder="Clave" value={loginClave} onChange={e=>{setLoginClave(e.target.value);setLoginError("");}}
              onKeyDown={e=>{ if(e.key==="Enter") handleLogin(); }} style={sInp(false)} />
            {loginError && <div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>{loginError}</div>}
            <button onClick={handleLogin} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:16,cursor:"pointer" }}>Ingresar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh",background:"#0f0f0f",color:"#f0ede6",fontFamily:"'Segoe UI',system-ui,sans-serif",paddingBottom:60 }}>
      <div style={{ background:"#141414",borderBottom:"1px solid #232323",padding:"18px 20px 0" }}>
        <div style={{ maxWidth:520,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <img src={LOGO} alt="PDC" style={{ height:34,width:"auto",display:"block" }} /><span style={{ fontSize:20,fontWeight:700,letterSpacing:1,color:"#f2efe8" }}>PDC BARBERÍA</span>
            </div>
            <button onClick={handleLogout} style={{ background:"transparent",border:"1px solid #2a2a2a",borderRadius:8,padding:"5px 10px",color:"#888",fontSize:11,cursor:"pointer" }}>Salir</button>
          </div>
          <div style={{ fontSize:11,color:"#666",letterSpacing:1.5,marginBottom:14,textTransform:"uppercase" }}>{esAdmin?"Administración · "+ADMIN_NOMBRE.split(" ")[0]:sesion.usuario.split(" ")[0]}</div>
          {/* Módulos */}
          <div style={{ display:"flex",gap:0,borderBottom:"1px solid #232323",overflowX:"auto" }}>
            {MODULOS.map(m => {
              const activo = moduloActivo.id === m.id;
              return (
                <button key={m.id} onClick={()=>{ setVista(m.subs[0].v); setBarberoDetalle(null); setPaseDetalle(null); }} style={{ flex:"1 0 auto",padding:"9px 12px",border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:"transparent",color:activo?"#f2efe8":"#666",borderBottom:activo?"2px solid #f2efe8":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap" }}>{m.label}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:520,margin:"0 auto",padding:"0 16px" }}>
        {/* Submódulos (solo si el módulo tiene más de uno) */}
        {moduloActivo.subs.length > 1 && (
          <div style={{ display:"flex",gap:8,paddingTop:16,flexWrap:"wrap" }}>
            {moduloActivo.subs.map(s => (
              <button key={s.v} onClick={()=>{ setVista(s.v); setBarberoDetalle(null); setPaseDetalle(null); }} style={{ padding:"7px 16px",borderRadius:20,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:vista===s.v?"#f2efe8":"#1e1e1e",color:vista===s.v?"#0f0f0f":"#aaa" }}>{s.label}</button>
            ))}
          </div>
        )}
        {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"#f2efe8",color:"#0f0f0f",padding:"10px 24px",borderRadius:20,fontWeight:700,fontSize:14,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.4)" }}>{toast}</div>}
        {confirmDelete && <Modal title="¿Eliminar este corte?" body="Esta acción no se puede deshacer." onCancel={()=>setConfirmDelete(null)} onConfirm={()=>handleDelete(confirmDelete)} />}
        {confirmDeletePago && <Modal title="¿Eliminar este pago?" body="El monto vuelve a sumarse al pendiente del barbero." onCancel={()=>setConfirmDeletePago(null)} onConfirm={()=>handleDeletePago(confirmDeletePago)} />}

        {confirmDeleteTurno && <Modal title="¿Eliminar este turno?" body="Se quita de la agenda." onCancel={()=>setConfirmDeleteTurno(null)} onConfirm={()=>handleDeleteTurno(confirmDeleteTurno)} />}
        {confirmDeleteGasto && <Modal title="¿Eliminar este gasto?" body="Se quita del historial." onCancel={()=>setConfirmDeleteGasto(null)} onConfirm={()=>handleDeleteGasto(confirmDeleteGasto)} />}
        {confirmDeletePase && <Modal title="¿Eliminar esta membresía?" body="Se borran sus visitas y cuotas." onCancel={()=>setConfirmDeletePase(null)} onConfirm={()=>handleDeletePase(confirmDeletePase)} />}

        {/* Cliente nuevo detectado al registrar corte/membresía */}
        {clienteNuevo && clienteNuevoPaso==="decision" && (
          <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
            <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:340,width:"100%",border:"1px solid #2a2a2a" }}>
              <div style={{ fontWeight:700,marginBottom:8,color:"#f2efe8" }}>Este cliente no está en tu base</div>
              <div style={{ color:"#aaa",fontSize:13,marginBottom:20 }}>Registraste un {clienteNuevo.tipo} para <b>{clienteNuevo.nombre}</b>, pero todavía no tenés su ficha de cliente. ¿Querés agregarlo a tu base?</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                <button onClick={()=>{ setClienteForm({ nombre:clienteNuevo.nombre, telefono:clienteNuevo.telefono, barba:false, barbero:"", instagram:"", nota:"" }); setClienteFormErrors({}); setClienteNuevoPaso("ficha"); }} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:14,cursor:"pointer" }}>Completar datos del cliente</button>
                <button onClick={()=>{ const cont=clienteNuevo.continuar; setClienteNuevo(null); cont(); }} style={{ padding:"12px 0",borderRadius:10,border:"1px solid #333",background:"transparent",color:"#aaa",fontWeight:600,fontSize:14,cursor:"pointer" }}>Registrar sin guardar cliente</button>
              </div>
            </div>
          </div>
        )}
        {clienteNuevo && clienteNuevoPaso==="ficha" && (
          <ActionModal title="Datos del cliente" subtitle={`Se guarda la ficha y se registra el ${clienteNuevo.tipo}.`} onClose={()=>setClienteNuevo(null)} zIndex={1000}>
            <ClienteFichaForm clienteForm={clienteForm} setClienteForm={setClienteForm} errors={clienteFormErrors} setErrors={setClienteFormErrors} sInp={sInp}
              lockNombre={true} showBarbero={false} barberos={BARBEROS}
              onSave={()=>{
                if (!clienteForm.telefono.trim()) { setClienteFormErrors({ telefono:true }); return; }
                upsertClienteFicha(clienteForm);
                const cont = clienteNuevo.continuar;
                setClienteNuevo(null); setClienteFormErrors({});
                cont();
              }}
              saveLabel={`Guardar cliente y ${clienteNuevo.tipo}`} />
          </ActionModal>
        )}

        {/* Editar ficha de un cliente existente */}
        {editarCliente && (
          <ActionModal title="Editar cliente" onClose={()=>setEditarCliente(null)} zIndex={1000}>
            <ClienteFichaForm clienteForm={clienteForm} setClienteForm={setClienteForm} errors={clienteFormErrors} setErrors={setClienteFormErrors} sInp={sInp}
              lockNombre={true} showBarbero={true} barberos={BARBEROS}
              onSave={()=>{
                if (!clienteForm.telefono.trim()) { setClienteFormErrors({ telefono:true }); return; }
                upsertClienteFicha(clienteForm);
                setEditarCliente(null); setClienteFormErrors({});
                setToast("Cliente actualizado");
              }}
              saveLabel="Guardar cambios" />
          </ActionModal>
        )}
        {cuotaPago && (
          <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
            <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:320,width:"100%",border:"1px solid #2a2a2a" }}>
              <div style={{ fontWeight:700,marginBottom:4 }}>Pagar cuota {cuotaPago.n}</div>
              <div style={{ color:"#888",fontSize:13,marginBottom:16 }}>Restante: {fmt(cuotaPago.restante)}. Podés pagar parcial o total.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <input type="number" placeholder="Monto a pagar" value={cuotaMonto} onChange={e=>setCuotaMonto(e.target.value)} style={sInp(false)} />
                <select value={cuotaMedio} onChange={e=>setCuotaMedio(e.target.value)} style={{ ...sInp(false), color:cuotaMedio?"#f0ede6":"#666", appearance:"none" }}>
                  <option value="">Medio de pago</option>
                  {MEDIOS_PAGO_BARBERO.map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <button onClick={()=>setCuotaMonto(String(cuotaPago.restante))} style={{ background:"transparent",border:"1px solid #333",borderRadius:8,padding:"8px 0",color:"#aaa",fontSize:13,cursor:"pointer" }}>Pagar total ({fmt(cuotaPago.restante)})</button>
                <div style={{ display:"flex",gap:10,marginTop:4 }}>
                  <button onClick={()=>{setCuotaPago(null);setCuotaMonto("");setCuotaMedio("");}} style={{ flex:1,padding:"10px 0",borderRadius:8,border:"1px solid #333",background:"transparent",color:"#aaa",cursor:"pointer" }}>Cancelar</button>
                  <button onClick={handlePagarCuota} style={{ flex:1,padding:"10px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontWeight:700,cursor:"pointer" }}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ── HISTORIAL ── */}
        {vista === "historial" && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Historial</div>
            <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:14,border:"1px solid #232323" }}>
              {[{id:"dia",label:"Un día"},{id:"lapso",label:"Período"}].map(m=>(
                <button key={m.id} onClick={()=>setModoFiltro(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:modoFiltro===m.id?"#f2efe8":"transparent",color:modoFiltro===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
              ))}
            </div>
            {modoFiltro==="dia" ? (
              <div style={{ marginBottom:18 }}><input type="date" value={filtroDia} onChange={e=>setFiltroDia(e.target.value)} style={{...sInp(false),width:"auto"}} /></div>
            ) : (
              <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:18,flexWrap:"wrap" }}>
                <input type="date" value={filtroDesde} onChange={e=>setFiltroDesde(e.target.value)} style={{...sInp(false),flex:1,minWidth:130}} />
                <span style={{ color:"#666",fontSize:13 }}>hasta</span>
                <input type="date" value={filtroHasta} onChange={e=>setFiltroHasta(e.target.value)} style={{...sInp(false),flex:1,minWidth:130}} />
              </div>
            )}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323" }}>
              <div style={{ fontSize:12,color:"#888",marginBottom:10,textTransform:"uppercase",letterSpacing:1 }}>Resumen · {labelFiltro}</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14 }}>
                {[["Cortes",cortesHistorial.length,"#f2efe8",22],["Servicios",fmt(totalServiciosH),"#f0ede6",16],["Propinas",fmt(totalPropinasH),"#7ec87e",16]].map(([l,v,col,fs])=>(
                  <div key={l} style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>{l}</div><div style={{ fontSize:fs,fontWeight:800,color:col }}>{v}</div></div>
                ))}
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #232323",paddingTop:10 }}>
                <span style={{ fontSize:13,color:"#aaa" }}>Total del período</span><span style={{ fontSize:20,fontWeight:800,color:"#f2efe8" }}>{fmt(totalH)}</span>
              </div>
            </div>
            {porBarberoH.length>0&&(
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Por barbero</div>
                {porBarberoH.map(b=>(
                  <div key={b.barbero} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e1e1e",marginBottom:8 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div><div style={{ fontWeight:600,fontSize:14 }}>{b.barbero.split(" ")[0]}</div><div style={{ fontSize:12,color:"#888" }}>{b.cantidad} corte{b.cantidad!==1?"s":""} · propinas {fmt(b.propinas)}</div></div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:17,fontWeight:800,color:"#f2efe8" }}>{fmt(b.total)}</div><div style={{ fontSize:11,color:"#b09a78" }}>comisión {fmt(b.comisiones)}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Movimientos</div>
            {movimientos.length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>No hay movimientos para este período.</div>
              : movimientos.map(m=>{
                const cuando = modoFiltro==="lapso"?formatFecha(m.fecha)+" · "+formatHora(m.fecha):formatHora(m.fecha);
                if (m.tipo==="corte") { const c=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{c.cliente}</span><span style={{ fontSize:11,background:"#232323",color:"#aaa",borderRadius:4,padding:"1px 7px" }}>{c.servicio}</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>✂️ {c.barbero.split(" ")[0]}</span><span>💳 {c.medioPago}</span><span>🕐 {cuando}</span></div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#f2efe8" }}>{fmt(c.monto)}</div>{c.propina>0&&<div style={{ fontSize:12,color:"#7ec87e" }}>+{fmt(c.propina)} propina</div>}{tieneIIBB(c.medioPago)&&<div style={{ fontSize:11,color:"#b09a78" }}>neto {fmt(netoIngreso(c.medioPago,c.monto+c.propina))}</div>}</div>
                    </div>
                    <button onClick={()=>setConfirmDelete(c.id)} style={{ marginTop:10,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",padding:0 }}>🗑 Eliminar</button>
                  </div>
                ); }
                if (m.tipo==="pase") { const p=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e2630",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{p.cliente}</span><span style={{ fontSize:11,background:"#16242e",color:"#5a9fd4",borderRadius:4,padding:"1px 7px" }}>Venta de membresía</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>🎫 {p.tipo}</span><span>💳 {p.medioPago}</span><span>🕐 {cuando}</span></div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#5a9fd4" }}>{fmt(p.monto)}</div>{tieneIIBB(p.medioPago)&&<div style={{ fontSize:11,color:"#b09a78" }}>neto {fmt(netoIngreso(p.medioPago,p.monto))}</div>}</div>
                    </div>
                  </div>
                ); }
                if (m.tipo==="gasto") { const g=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #2a1e1e",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{g.desc}</span><span style={{ fontSize:11,background:"#2a1e1e",color:"#e0846a",borderRadius:4,padding:"1px 7px" }}>Gasto</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>💳 {g.medioPago}</span><span>🕐 {cuando}</span></div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#e0846a" }}>−{fmt(g.monto)}</div></div>
                    </div>
                    <button onClick={()=>setConfirmDeleteGasto(g.id)} style={{ marginTop:10,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",padding:0 }}>🗑 Eliminar</button>
                  </div>
                ); }
                const p=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #2a1e1e",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{p.barbero.split(" ")[0]}</span><span style={{ fontSize:11,background:"#2a1e1e",color:"#e0846a",borderRadius:4,padding:"1px 7px" }}>Pago {p.tipo==="membresia"?"membresía":"cortes"}</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>💳 {p.medioPago}</span><span>🕐 {cuando}</span>{p.nota&&<span>📝 {p.nota}</span>}</div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#e0846a" }}>−{fmt(p.monto)}</div></div>
                    </div>
                    <button onClick={()=>setConfirmDeletePago(p.id)} style={{ marginTop:10,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",padding:0 }}>🗑 Eliminar</button>
                  </div>
                );
              })
            }
          </div>
        )}

        {/* ── MEMBRESÍAS (lista) ── */}
        {vista === "membresias" && !paseDetalle && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Membresías</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:20 }}>Miembros activos y vencidos. Para vender una nueva, usá el acceso rápido en Inicio.</div>

            {/* Lista de pases */}
            {pases.length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"30px 0",fontSize:14 }}>Todavía no vendiste ninguna membresía.</div>
              : pases.map(p=>{
                const dRest = diasEntre(hoy(), p.vence.slice(0,10));
                const activo = dRest >= 0;
                return (
                  <div key={p.id} onClick={()=>setPaseDetalle(p.id)} style={{ background:"#141414",borderRadius:12,padding:16,border:`1px solid ${activo?"#1e2a1e":"#2a1e1e"}`,marginBottom:10,cursor:"pointer" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                          <span style={{ fontWeight:700,fontSize:15 }}>{p.cliente}</span>
                          <span style={{ fontSize:10,background:activo?"#1e2a1e":"#2a1e1e",color:activo?"#7ec87e":"#e05c5c",borderRadius:4,padding:"2px 7px",fontWeight:600 }}>{activo?"ACTIVO":"VENCIDO"}</span>
                        </div>
                        <div style={{ fontSize:12,color:"#888" }}>{p.tipo} · {p.barbero.split(" ")[0]}</div>
                        <div style={{ fontSize:12,color:"#666",marginTop:2 }}>{p.visitas.length} visita{p.visitas.length!==1?"s":""} · vence {formatFecha(p.vence)}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:14,fontWeight:700,color:activo?"#7ec87e":"#e05c5c" }}>{activo?`${dRest} días`:`hace ${Math.abs(dRest)}d`}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        )}

        {/* ── DETALLE PASE ── */}
        {vista === "membresias" && paseDetalle && (() => {
          const p = pases.find(x => x.id === paseDetalle);
          if (!p) return null;
          const dRest = diasEntre(hoy(), p.vence.slice(0,10));
          const activo = dRest >= 0;
          // visitas por barbero
          const visitasPorBarbero = {};
          p.visitas.forEach(v => { visitasPorBarbero[v.barbero] = (visitasPorBarbero[v.barbero]||0)+1; });
          return (
            <div style={{ paddingTop:24 }}>
              <button onClick={()=>setPaseDetalle(null)} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16 }}>← Volver</button>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                <span style={{ fontSize:16,fontWeight:700 }}>{p.cliente}</span>
                <span style={{ fontSize:10,background:activo?"#1e2a1e":"#2a1e1e",color:activo?"#7ec87e":"#e05c5c",borderRadius:4,padding:"2px 7px",fontWeight:600 }}>{activo?"ACTIVO":"VENCIDO"}</span>
              </div>
              <div style={{ fontSize:12,color:"#888",marginBottom:20 }}>{p.tipo} · titular {p.barbero} · {fmt(p.monto)} ({p.medioPago})</div>

              {/* Stats */}
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
                <div style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>Visitas</div><div style={{ fontSize:20,fontWeight:800,color:"#f2efe8" }}>{p.visitas.length}</div></div>
                <div style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>Vence</div><div style={{ fontSize:13,fontWeight:700 }}>{formatFecha(p.vence)}</div></div>
                <div style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>{activo?"Restan":"Venció"}</div><div style={{ fontSize:14,fontWeight:800,color:activo?"#7ec87e":"#e05c5c" }}>{activo?`${dRest}d`:`-${Math.abs(dRest)}d`}</div></div>
              </div>

              {/* Registrar visita */}
              {activo && (
                <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323" }}>
                  <div style={{ fontSize:13,fontWeight:700,marginBottom:10 }}>Registrar visita de hoy</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                    <select value={visitaBarbero[p.id]||p.barbero} onChange={e=>setVisitaBarbero(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),color:"#f0ede6",appearance:"none" }}>
                      {BARBEROS.map(b=><option key={b} value={b}>{b}{b===p.barbero?" (titular)":""}</option>)}
                    </select>
                    <div style={{ display:"flex",gap:8 }}>
                      <input type="number" placeholder="Propina (opcional)" value={visitaPropina[p.id]||""} onChange={e=>setVisitaPropina(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),flex:1 }} />
                      {Number(visitaPropina[p.id])>0 && (
                        <select value={visitaMedio[p.id]||"Efectivo"} onChange={e=>setVisitaMedio(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),flex:1,color:"#f0ede6",appearance:"none" }}>
                          {MEDIOS_PAGO.map(m=><option key={m} value={m}>{m}</option>)}
                        </select>
                      )}
                    </div>
                    <button onClick={()=>handleRegistrarVisita(p.id)} style={{ padding:"10px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontWeight:700,cursor:"pointer" }}>+ Registrar visita</button>
                  </div>
                </div>
              )}

              {/* Visitas por barbero */}
              {Object.keys(visitasPorBarbero).length>0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Visitas por barbero</div>
                  {Object.entries(visitasPorBarbero).map(([b,n])=>(
                    <div key={b} style={{ display:"flex",justifyContent:"space-between",background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6 }}>
                      <span style={{ fontSize:14 }}>{b}{b===p.barbero?" (titular)":""}</span><span style={{ fontWeight:700,color:"#f2efe8" }}>{n}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Historial de visitas */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Historial de visitas</div>
              {p.visitas.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"10px 0 20px" }}>Sin visitas todavía.</div>
                : [...p.visitas].reverse().map((v,i)=>(
                  <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6 }}>
                    <span style={{ fontSize:13,color:"#aaa" }}>{formatFecha(v.fecha)} · {formatHora(v.fecha)}</span>
                    <span style={{ fontSize:13,textAlign:"right" }}>{v.barbero.split(" ")[0]}{v.propina>0&&<span style={{ color:"#7ec87e",marginLeft:8 }}>+{fmt(v.propina)} ({v.medioPropina})</span>}</span>
                  </div>
                ))
              }

              {/* Cuotas */}
              <div style={{ fontSize:12,color:"#888",margin:"20px 0 8px",textTransform:"uppercase",letterSpacing:1 }}>Cuotas de comisión (titular: {p.barbero.split(" ")[0]})</div>
              {p.cuotas.map(c=>{
                const rest = c.monto - c.pagado;
                const vencida = c.vence <= new Date().toISOString() && rest > 0;
                const saldada = rest <= 0;
                return (
                  <div key={c.n} style={{ background:"#141414",borderRadius:8,padding:"12px 14px",border:`1px solid ${saldada?"#1e2a1e":vencida?"#2a1e1e":"#1e1e1e"}`,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:600 }}>Cuota {c.n} · {fmt(c.monto)}</div>
                      <div style={{ fontSize:11,color:vencida?"#e05c5c":"#666" }}>vence {formatFecha(c.vence)}{c.pagado>0&&!saldada?` · pagado ${fmt(c.pagado)}`:""}</div>
                    </div>
                    {saldada
                      ? <span style={{ fontSize:12,color:"#7ec87e",fontWeight:700 }}>✓ Pagada</span>
                      : <button onClick={()=>{setCuotaPago({paseId:p.id,n:c.n,restante:rest});setCuotaMonto("");setCuotaMedio("");}} style={{ background:vencida?"#b09a78":"#2a2a2a",color:vencida?"#0f0f0f":"#aaa",border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer" }}>Pagar</button>
                    }
                  </div>
                );
              })}

              <button onClick={()=>setConfirmDeletePase(p.id)} style={{ marginTop:20,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer" }}>🗑 Eliminar pase</button>
            </div>
          );
        })()}


        {/* ── COMISIÓN BARBEROS (lista) ── */}
        {vista === "comisiones" && !barberoDetalle && (() => {
          const cortesRevision = filtrarPorPeriodo(cortes, revisarCortesModo==="dia"?"hoy":"semana").sort((a,b)=>b.fecha.localeCompare(a.fecha));
          return (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Pagos</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:16 }}>Revisá los cortes del período y pagá a cada barbero</div>

            {/* Revisar cortes */}
            <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Revisar cortes</div>
            <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:10,border:"1px solid #232323" }}>
              {[{id:"dia",label:"Hoy"},{id:"semana",label:"Esta semana"}].map(m=>(
                <button key={m.id} onClick={()=>setRevisarCortesModo(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:revisarCortesModo===m.id?"#f2efe8":"transparent",color:revisarCortesModo===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
              ))}
            </div>
            {cortesRevision.length===0
              ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>Sin cortes en este período.</div>
              : (
                <div style={{ marginBottom:8 }}>
                  {cortesRevision.map(c=>(
                    <div key={c.id} style={{ background:"#141414",borderRadius:10,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div><div style={{ fontSize:14,fontWeight:600 }}>{c.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{c.barbero.split(" ")[0]} · {c.servicio} · {formatFecha(c.fecha)}</div></div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:14,fontWeight:700 }}>{fmt(c.monto+c.propina)}</div><div style={{ fontSize:11,color:"#b09a78" }}>comisión {fmt(c.comision||0)}</div></div>
                    </div>
                  ))}
                </div>
              )
            }
            <div style={{ fontSize:11,color:"#666",marginBottom:24 }}>Para meses anteriores o el detalle completo, consultá Historial.</div>

            <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Pago a barberos</div>
            <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
              {BARBEROS.map(b=>{
                const cor = comisionCortesBarbero(b);
                const mem = comisionMembresiaBarbero(b);
                const aPagar = cor.pendiente + mem.vencidoPendiente; // tarea diaria: cortes + cuotas vencidas
                const totalPend = cor.pendiente + mem.totalPendiente;
                const porVencer = mem.totalPendiente - mem.vencidoPendiente;
                return (
                  <div key={b} onClick={()=>setBarberoDetalle(b)} style={{ background:"#141414",borderRadius:12,padding:16,border:`1px solid ${aPagar>0?"#2a2218":"#1e2a1e"}`,cursor:"pointer" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ fontWeight:700,fontSize:15,marginBottom:4 }}>{b}</div>
                        <div style={{ fontSize:12,color:"#888" }}>Cortes: {fmt(cor.pendiente)}{mem.vencidoPendiente>0?` · Membresía: ${fmt(mem.vencidoPendiente)}`:""}</div>
                        {porVencer>0&&<div style={{ fontSize:11,color:"#666",marginTop:2 }}>+ {fmt(porVencer)} en cuotas por vencer</div>}
                      </div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:22,fontWeight:800,color:aPagar>0?"#b09a78":"#7ec87e" }}>{fmt(aPagar)}</div><div style={{ fontSize:11,color:"#555" }}>a pagar ahora</div></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop:"1px solid #1e1e1e",paddingTop:20 }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Pagar cortes a barbero</div>
              <div style={{ fontSize:11,color:"#666",marginBottom:14 }}>Las cuotas de membresía se pagan desde cada pase.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <Sel sInp={sInp} field="barbero" options={BARBEROS} placeholder="Barbero" value={pagoForm.barbero} errs={pagoErrors} onChange={e=>{ const b=e.target.value; const pend=b?comisionCortesBarbero(b).pendiente:0; setPagoForm(f=>({...f,barbero:b,monto:pend>0?String(pend):f.monto}));setPagoErrors(er=>({...er,barbero:false}));}} />
                <input type="number" placeholder="Monto pagado ($)" value={pagoForm.monto} style={sInp(pagoErrors.monto)} onChange={e=>{setPagoForm(f=>({...f,monto:e.target.value}));setPagoErrors(er=>({...er,monto:false}));}} />
                <Sel sInp={sInp} field="medioPago" options={MEDIOS_PAGO_BARBERO} placeholder="Medio de pago (Efectivo o MercadoPago)" value={pagoForm.medioPago} errs={pagoErrors} onChange={e=>{setPagoForm(f=>({...f,medioPago:e.target.value}));setPagoErrors(er=>({...er,medioPago:false}));}} />
                <input type="text" placeholder="Nota (opcional)" value={pagoForm.nota} style={sInp(false)} onChange={e=>setPagoForm(f=>({...f,nota:e.target.value}))} />
                <button onClick={handleRegistrarPago} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#2a3a2a",color:"#7ec87e",fontWeight:800,fontSize:15,cursor:"pointer" }}>Registrar pago de cortes</button>
                {Object.values(pagoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá barbero, monto y medio de pago.</div>}
              </div>
            </div>
          </div>
          );
        })()}

        {/* ── DETALLE BARBERO ── */}
        {vista === "comisiones" && barberoDetalle && (() => {
          const cor = comisionCortesBarbero(barberoDetalle);
          const mem = comisionMembresiaBarbero(barberoDetalle);
          return (
            <div style={{ paddingTop:24 }}>
              <button onClick={()=>setBarberoDetalle(null)} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16 }}>← Volver</button>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:4 }}>{barberoDetalle}</div>
              <div style={{ fontSize:12,color:"#888",marginBottom:20 }}>Pendiente total {fmt(cor.pendiente + mem.totalPendiente)}</div>

              {/* Cortes */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Cortes</div>
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
                {[["Comisiones",fmt(cor.total),"#f2efe8"],["Pagado",fmt(cor.pagado),"#7ec87e"],["Pendiente",fmt(cor.pendiente),cor.pendiente>0?"#b09a78":"#7ec87e"]].map(([l,v,col])=>(
                  <div key={l} style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>{l}</div><div style={{ fontSize:15,fontWeight:800,color:col }}>{v}</div></div>
                ))}
              </div>

              {/* Membresías */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Membresías (cuotas)</div>
              {mem.cuotas.filter(c=>c.monto-c.pagado>0).length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>Sin cuotas pendientes.</div>
                : mem.cuotas.filter(c=>c.monto-c.pagado>0).sort((a,b)=>a.vence.localeCompare(b.vence)).map((c,i)=>{
                  const rest = c.monto - c.pagado;
                  const vencida = c.vence <= new Date().toISOString();
                  return (
                    <div key={i} style={{ background:"#141414",borderRadius:8,padding:"12px 14px",border:`1px solid ${vencida?"#2a1e1e":"#1e1e1e"}`,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:13,fontWeight:600 }}>{c.cliente} · cuota {c.n}</div>
                        <div style={{ fontSize:11,color:vencida?"#e05c5c":"#666" }}>{c.tipo} · vence {formatFecha(c.vence)}{c.pagado>0?` · pagado ${fmt(c.pagado)}`:""}</div>
                      </div>
                      <button onClick={()=>{setCuotaPago({paseId:c.paseId,n:c.n,restante:rest});setCuotaMonto("");setCuotaMedio("");}} style={{ background:vencida?"#b09a78":"#2a2a2a",color:vencida?"#0f0f0f":"#aaa",border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer" }}>{fmt(rest)}</button>
                    </div>
                  );
                })
              }

              {/* Pagos realizados */}
              <div style={{ fontSize:12,color:"#888",margin:"20px 0 8px",textTransform:"uppercase",letterSpacing:1 }}>Pagos realizados</div>
              {pagos.filter(p=>p.barbero===barberoDetalle).length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0" }}>Sin pagos.</div>
                : pagos.filter(p=>p.barbero===barberoDetalle).map(p=>(
                  <div key={p.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e2a1e",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:14,fontWeight:600,color:"#7ec87e" }}>{fmt(p.monto)} <span style={{ fontSize:10,color:"#666",fontWeight:400 }}>{p.tipo==="membresia"?"membresía":"cortes"}</span></div>
                      <div style={{ fontSize:12,color:"#666" }}>💳 {p.medioPago} · {formatFecha(p.fecha)}{p.nota?` · ${p.nota}`:""}</div>
                    </div>
                    <button onClick={()=>setConfirmDeletePago(p.id)} style={{ background:"transparent",border:"none",color:"#444",fontSize:12,cursor:"pointer" }}>🗑</button>
                  </div>
                ))
              }
            </div>
          );
        })()}

        {/* ── INICIO (Panel de control) ── */}
        {vista === "inicio" && esAdmin && (() => {
          const turnosHoy = turnos.filter(t=>t.fecha===hoy()).sort((a,b)=>a.hora.localeCompare(b.hora));
          const alertas48 = turnos.filter(t=>{ const h=horasHasta(t.fecha,t.hora); return h>=0 && h<48; });
          const st = statsPeriodo(periodoResumen);
          const labelPeriodo = periodoResumen==="hoy"?"hoy":periodoResumen==="semana"?"esta semana":"este mes";
          const cerrar = () => setModalAdmin(null);
          return (
            <div style={{ paddingTop:20 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Hola, {ADMIN_NOMBRE.split(" ")[0]} 👋</div>

              {/* Dos acciones principales, mismo peso */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
                <button onClick={()=>setVista("aprobaciones")} style={{ padding:"18px 8px",borderRadius:14,background:pendCount>0?"#3a2e16":"#141414",color:pendCount>0?"#f2d488":"#f0ede6",fontWeight:800,fontSize:14,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,border:pendCount>0?"1px solid #5a4a22":"1px solid #232323" }}>
                  <span style={{ fontSize:22 }}>⏳</span>
                  <span>Aprobar{pendCount>0?` (${pendCount})`:""}</span>
                </button>
                <button onClick={()=>setModalAdmin("corte")} style={{ padding:"18px 8px",borderRadius:14,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:14,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:22 }}>✂️</span>
                  <span>Cargar servicio</span>
                </button>
              </div>

              {/* Accesos rápidos secundarios */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:24 }}>
                {[
                  { id:"turno", icon:"📅", label:"Turno" },
                  { id:"membresia", icon:"🎫", label:"Membresía" },
                  { id:"pago", icon:"💵", label:"Pago a barbero" },
                ].map(a=>(
                  <button key={a.id} onClick={()=>setModalAdmin(a.id)} style={{ background:"#141414",border:"1px solid #232323",borderRadius:12,padding:"12px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                    <span style={{ fontSize:18 }}>{a.icon}</span>
                    <span style={{ fontSize:10.5,color:"#aaa",fontWeight:600,textAlign:"center" }}>{a.label}</span>
                  </button>
                ))}
              </div>

              {/* Números del negocio */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Números</div>
              <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:10,border:"1px solid #232323" }}>
                {[{id:"hoy",label:"Hoy"},{id:"semana",label:"Esta semana"},{id:"mes",label:"Este mes"}].map(m=>(
                  <button key={m.id} onClick={()=>setPeriodoResumen(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:periodoResumen===m.id?"#f2efe8":"transparent",color:periodoResumen===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
                ))}
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Total facturado · {labelPeriodo}</div><div style={{ fontSize:18,fontWeight:800,color:"#7ec87e" }}>{fmt(st.dinero)}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Neto · {labelPeriodo}</div><div style={{ fontSize:18,fontWeight:800,color:"#5a9fd4" }}>{fmt(st.neto)}</div></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Cortes · {labelPeriodo}</div><div style={{ fontSize:18,fontWeight:800 }}>{st.cortes}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Clientes nuevos</div><div style={{ fontSize:18,fontWeight:800,color:"#f2efe8" }}>{st.nuevos}</div></div>
              </div>
              <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e",marginBottom:24 }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Clientes recurrentes</div><div style={{ fontSize:18,fontWeight:800,color:"#f2efe8" }}>{st.recurrentes}</div></div>

              {/* Alertas 48hs */}
              {alertas48.length>0 && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>⏰ Recordar enviar WhatsApp (faltan &lt;48hs)</div>
                  {alertas48.map(t=>(
                    <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #3a2e16",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div><div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{formatFecha(t.fecha)} {t.hora} · {t.barbero.split(" ")[0]}</div></div>
                      <a href={waLink(t)} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",padding:"7px 12px",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12,fontWeight:700 }}>💬</a>
                    </div>
                  ))}
                </div>
              )}

              {/* Turnos de hoy */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Turnos de hoy</div>
              {turnosHoy.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>No hay turnos para hoy.</div>
                : turnosHoy.map(t=>(
                  <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",alignItems:"center",gap:12 }}>
                    <span style={{ fontSize:16,fontWeight:800,color:"#f2efe8",minWidth:48 }}>{t.hora}</span>
                    <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{t.barbero.split(" ")[0]} · {t.barba?"corte+barba":"corte"}</div></div>
                  </div>
                ))
              }
              <button onClick={()=>setVista("turnos")} style={{ width:"100%",padding:"12px 0",borderRadius:10,border:"1px solid #2a2a2a",background:"transparent",color:"#aaa",fontWeight:600,fontSize:13,cursor:"pointer" }}>
                Ver agenda completa →
              </button>

              {/* ── MODALES DE ACCIONES RÁPIDAS (admin) ── */}
              {modalAdmin==="corte" && (
                <ActionModal title="Cargar servicio" onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <Sel sInp={sInp} field="servicio" options={SERVICIOS} placeholder="Tipo de servicio" value={form.servicio} errs={errors} onChange={e=>{setForm(f=>({...f,servicio:e.target.value}));setErrors(er=>({...er,servicio:false}));}} />
                    <ClienteInput value={form.cliente} clientes={clientes} err={errors.cliente} sInp={sInp}
                      onChange={v=>{setForm(f=>({...f,cliente:v}));setErrors(er=>({...er,cliente:false}));}}
                      onPick={c=>setForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                    <input type="tel" placeholder="Teléfono (opcional)" value={form.telefono} style={sInp(false)} onChange={e=>setForm(f=>({...f,telefono:e.target.value}))} />
                    <Sel sInp={sInp} field="barbero" options={BARBEROS} placeholder="Barbero" value={form.barbero} errs={errors} onChange={e=>{setForm(f=>({...f,barbero:e.target.value}));setErrors(er=>({...er,barbero:false}));}} />
                    <Sel sInp={sInp} field="medioPago" options={MEDIOS_PAGO} placeholder="Medio de pago" value={form.medioPago} errs={errors} onChange={e=>{setForm(f=>({...f,medioPago:e.target.value}));setErrors(er=>({...er,medioPago:false}));}} />
                    <div style={{ display:"flex",gap:10 }}>
                      <input placeholder="Monto ($)" type="number" value={form.monto} style={{...sInp(errors.monto),flex:1}} onChange={e=>{setForm(f=>({...f,monto:e.target.value}));setErrors(er=>({...er,monto:false}));}} />
                      <input placeholder="Propina" type="number" value={form.propina} style={{...sInp(false),flex:1}} onChange={e=>setForm(f=>({...f,propina:e.target.value}))} />
                    </div>
                    {(form.servicio==="Corte"||form.servicio==="Corte y Barba") && (
                      <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:13,color:"#aaa",display:"flex",justifyContent:"space-between" }}>
                        <span>Comisión del barbero</span><span style={{ color:"#f2efe8",fontWeight:700 }}>{fmt(comisionBarbero(form.servicio,form.monto?Number(form.monto):0,form.propina?Number(form.propina):0))}</span>
                      </div>
                    )}
                    <button onClick={()=>{ const e=validate(); if(Object.keys(e).length){setErrors(e);return;} conVerificacionCliente(form.cliente, form.telefono, "corte", handleSubmit); }} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Registrar servicio</button>
                    {Object.values(errors).some(Boolean) && <div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá todos los campos obligatorios.</div>}
                  </div>
                </ActionModal>
              )}

              {modalAdmin==="turno" && (
                <ActionModal title="Agendar turno" onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <div style={{ display:"flex",gap:8 }}>
                      <input type="date" value={turnoForm.fecha} onChange={e=>{setTurnoForm(f=>({...f,fecha:e.target.value}));setTurnoErrors(er=>({...er,fecha:false}));}} style={{ ...sInp(turnoErrors.fecha),flex:2 }} />
                      <select value={turnoForm.hora} onChange={e=>{setTurnoForm(f=>({...f,hora:e.target.value}));setTurnoErrors(er=>({...er,hora:false}));}} style={{ ...sInp(turnoErrors.hora),flex:1,color:turnoForm.hora?"#f0ede6":"#666",appearance:"none" }}>
                        <option value="">Hora</option>
                        {Array.from({length:((21-9)*4)+4},(_, i)=>{ const min=9*60+i*15; const h=String(Math.floor(min/60)).padStart(2,"0"); const m=String(min%60).padStart(2,"0"); return <option key={i} value={`${h}:${m}`}>{h}:{m}</option>; })}
                      </select>
                    </div>
                    <ClienteInput value={turnoForm.cliente} clientes={clientes} err={turnoErrors.cliente} sInp={sInp} placeholder="Nombre completo del cliente"
                      onChange={v=>{setTurnoForm(f=>({...f,cliente:v}));setTurnoErrors(er=>({...er,cliente:false}));}}
                      onPick={c=>setTurnoForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                    <input type="tel" placeholder="Número de teléfono" value={turnoForm.telefono} style={sInp(turnoErrors.telefono)} onChange={e=>{setTurnoForm(f=>({...f,telefono:e.target.value}));setTurnoErrors(er=>({...er,telefono:false}));}} />
                    <Sel sInp={sInp} field="barbero" options={BARBEROS} placeholder="Barbero" value={turnoForm.barbero} errs={turnoErrors} onChange={e=>{setTurnoForm(f=>({...f,barbero:e.target.value}));setTurnoErrors(er=>({...er,barbero:false}));}} />
                    <div style={{ display:"flex",gap:8 }}>
                      {[{v:false,l:"Solo corte"},{v:true,l:"Con barba"}].map(o=>(
                        <button key={o.l} onClick={()=>setTurnoForm(f=>({...f,barba:o.v}))} style={{ flex:1,padding:"10px 0",borderRadius:8,border:`1.5px solid ${turnoForm.barba===o.v?"#f2efe8":"#2a2a2a"}`,background:turnoForm.barba===o.v?"#1f1d18":"#181818",color:turnoForm.barba===o.v?"#f2efe8":"#888",fontSize:13,fontWeight:600,cursor:"pointer" }}>{o.l}</button>
                      ))}
                    </div>
                    <input placeholder="Nota (opcional)" value={turnoForm.nota} style={sInp(false)} onChange={e=>setTurnoForm(f=>({...f,nota:e.target.value}))} />
                    <button onClick={handleAgregarTurno} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Agendar</button>
                    {Object.values(turnoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá fecha, hora, cliente, teléfono y barbero.</div>}
                  </div>
                </ActionModal>
              )}

              {modalAdmin==="membresia" && (
                <ActionModal title="Vender membresía" onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <ClienteInput value={paseForm.cliente} clientes={clientes} err={paseErrors.cliente} sInp={sInp}
                      onChange={v=>{setPaseForm(f=>({...f,cliente:v}));setPaseErrors(er=>({...er,cliente:false}));}}
                      onPick={c=>setPaseForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                    <input type="tel" placeholder="Teléfono" value={paseForm.telefono} style={sInp(paseErrors.telefono)} onChange={e=>{setPaseForm(f=>({...f,telefono:e.target.value}));setPaseErrors(er=>({...er,telefono:false}));}} />
                    <Sel sInp={sInp} field="tipo" options={TIPOS_PASE} placeholder="Tipo de membresía" value={paseForm.tipo} errs={paseErrors} onChange={e=>{setPaseForm(f=>({...f,tipo:e.target.value}));setPaseErrors(er=>({...er,tipo:false}));}} />
                    <Sel sInp={sInp} field="barbero" options={BARBEROS} placeholder="Barbero titular" value={paseForm.barbero} errs={paseErrors} onChange={e=>{setPaseForm(f=>({...f,barbero:e.target.value}));setPaseErrors(er=>({...er,barbero:false}));}} />
                    <Sel sInp={sInp} field="medioPago" options={MEDIOS_PAGO} placeholder="Medio de pago" value={paseForm.medioPago} errs={paseErrors} onChange={e=>{setPaseForm(f=>({...f,medioPago:e.target.value}));setPaseErrors(er=>({...er,medioPago:false}));}} />
                    <input placeholder="Monto cobrado ($)" type="number" value={paseForm.monto} style={sInp(paseErrors.monto)} onChange={e=>{setPaseForm(f=>({...f,monto:e.target.value}));setPaseErrors(er=>({...er,monto:false}));}} />
                    {paseForm.tipo && <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#888" }}>Vence en {PASE_CONFIG[paseForm.tipo].dias} días · comisión de {fmt(PASE_CONFIG[paseForm.tipo].montoCuota)} disponible para el barbero de inmediato</div>}
                    <button onClick={()=>{ const e=validatePase(); if(Object.keys(e).length){setPaseErrors(e);return;} conVerificacionCliente(paseForm.cliente, paseForm.telefono, "membresía", handleVenderPase); }} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Vender membresía</button>
                    {Object.values(paseErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá todos los campos.</div>}
                  </div>
                </ActionModal>
              )}

              {modalAdmin==="pago" && (
                <ActionModal title="Pago a barbero" subtitle="Pago de cortes. Las membresías se pagan desde cada pase." onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <Sel sInp={sInp} field="barbero" options={BARBEROS} placeholder="Barbero" value={pagoForm.barbero} errs={pagoErrors} onChange={e=>{ const b=e.target.value; const pend=b?comisionCortesBarbero(b).pendiente:0; setPagoForm(f=>({...f,barbero:b,monto:pend>0?String(pend):f.monto}));setPagoErrors(er=>({...er,barbero:false}));}} />
                    <input type="number" placeholder="Monto pagado ($)" value={pagoForm.monto} style={sInp(pagoErrors.monto)} onChange={e=>{setPagoForm(f=>({...f,monto:e.target.value}));setPagoErrors(er=>({...er,monto:false}));}} />
                    <Sel sInp={sInp} field="medioPago" options={MEDIOS_PAGO_BARBERO} placeholder="Medio de pago (Efectivo o MercadoPago)" value={pagoForm.medioPago} errs={pagoErrors} onChange={e=>{setPagoForm(f=>({...f,medioPago:e.target.value}));setPagoErrors(er=>({...er,medioPago:false}));}} />
                    <input type="text" placeholder="Nota (opcional)" value={pagoForm.nota} style={sInp(false)} onChange={e=>setPagoForm(f=>({...f,nota:e.target.value}))} />
                    <button onClick={handleRegistrarPago} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Registrar pago</button>
                    {Object.values(pagoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá barbero, monto y medio de pago.</div>}
                  </div>
                </ActionModal>
              )}
            </div>
          );
        })()}

        {/* ── TURNOS ── */}
        {vista === "turnos" && (() => {
          const lista = turnos.filter(t => {
            if (barberoActivo && t.barbero !== barberoActivo) return false;
            if (!barberoActivo && turnoFiltroBarbero !== "Todos" && t.barbero !== turnoFiltroBarbero) return false;
            if (turnoModo === "dia") return t.fecha === turnoFecha;
            const { desde, hasta } = rangoSemana(turnoFecha);
            return t.fecha >= desde && t.fecha <= hasta;
          }).sort((a,b)=> (a.fecha+a.hora).localeCompare(b.fecha+b.hora));
          // agrupar por fecha para vista semana
          const porFecha = {};
          lista.forEach(t => { (porFecha[t.fecha] = porFecha[t.fecha] || []).push(t); });
          const sem = rangoSemana(turnoFecha);
          const labelSem = `${formatFecha(sem.desde+"T12:00:00")} → ${formatFecha(sem.hasta+"T12:00:00")}`;
          const diaNombre = iso => new Date(iso+"T12:00:00").toLocaleDateString("es-AR",{weekday:"long"});
          return (
            <div style={{ paddingTop:24 }}>
              {esAdmin && <button onClick={()=>setVista("inicio")} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16,fontWeight:600 }}>← Volver</button>}
              <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Turnos</div>

              {/* Agendar */}
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:22,border:"1px solid #232323" }}>
                <div style={{ fontSize:14,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Agendar turno</div>
                <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                  <div style={{ display:"flex",gap:8 }}>
                    <input type="date" value={turnoForm.fecha} onChange={e=>{setTurnoForm(f=>({...f,fecha:e.target.value}));setTurnoErrors(er=>({...er,fecha:false}));}} style={{ ...sInp(turnoErrors.fecha),flex:2 }} />
                    <select value={turnoForm.hora} onChange={e=>{setTurnoForm(f=>({...f,hora:e.target.value}));setTurnoErrors(er=>({...er,hora:false}));}} style={{ ...sInp(turnoErrors.hora),flex:1,color:turnoForm.hora?"#f0ede6":"#666",appearance:"none" }}>
                      <option value="">Hora</option>
                      {Array.from({length:((21-9)*4)+4},(_, i)=>{ const min=9*60+i*15; const h=String(Math.floor(min/60)).padStart(2,"0"); const m=String(min%60).padStart(2,"0"); return <option key={i} value={`${h}:${m}`}>{h}:{m}</option>; })}
                    </select>
                  </div>
                  <ClienteInput value={turnoForm.cliente} clientes={clientes} err={turnoErrors.cliente} sInp={sInp} placeholder="Nombre completo del cliente"
                    onChange={v=>{setTurnoForm(f=>({...f,cliente:v}));setTurnoErrors(er=>({...er,cliente:false}));}}
                    onPick={c=>setTurnoForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                  <input type="tel" placeholder="Número de teléfono" value={turnoForm.telefono} style={sInp(turnoErrors.telefono)} onChange={e=>{setTurnoForm(f=>({...f,telefono:e.target.value}));setTurnoErrors(er=>({...er,telefono:false}));}} />
                  {barberoActivo ? (
                    <div style={{ ...sInp(false), color:"#f0ede6", display:"flex", alignItems:"center" }}>✂️ {barberoActivo}</div>
                  ) : (
                    <select value={turnoForm.barbero} onChange={e=>{setTurnoForm(f=>({...f,barbero:e.target.value}));setTurnoErrors(er=>({...er,barbero:false}));}} style={{ ...sInp(turnoErrors.barbero),color:turnoForm.barbero?"#f0ede6":"#666",appearance:"none" }}>
                      <option value="">Barbero</option>
                      {BARBEROS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  )}
                  <div style={{ display:"flex",gap:8 }}>
                    {[{v:false,l:"Solo corte"},{v:true,l:"Con barba"}].map(o=>(
                      <button key={o.l} onClick={()=>setTurnoForm(f=>({...f,barba:o.v}))} style={{ flex:1,padding:"10px 0",borderRadius:8,border:`1.5px solid ${turnoForm.barba===o.v?"#f2efe8":"#2a2a2a"}`,background:turnoForm.barba===o.v?"#1f1d18":"#181818",color:turnoForm.barba===o.v?"#f2efe8":"#888",fontSize:13,fontWeight:600,cursor:"pointer" }}>{o.l}</button>
                    ))}
                  </div>
                  <input placeholder="Nota (opcional)" value={turnoForm.nota} style={sInp(false)} onChange={e=>setTurnoForm(f=>({...f,nota:e.target.value}))} />
                  <button onClick={handleAgregarTurno} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer" }}>Agendar</button>
                  {Object.values(turnoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá fecha, hora, cliente, teléfono y barbero.</div>}
                </div>
              </div>

              {/* Controles vista */}
              <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:10,border:"1px solid #232323" }}>
                {[{id:"dia",label:"Día"},{id:"semana",label:"Semana"}].map(m=>(
                  <button key={m.id} onClick={()=>setTurnoModo(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:turnoModo===m.id?"#f2efe8":"transparent",color:turnoModo===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
                ))}
              </div>
              <div style={{ display:"flex",gap:8,marginBottom:10,alignItems:"center" }}>
                <input type="date" value={turnoFecha} onChange={e=>setTurnoFecha(e.target.value)} style={{ ...sInp(false),flex:1 }} />
                {turnoModo==="semana"&&<span style={{ fontSize:11,color:"#666" }}>{labelSem}</span>}
              </div>
              {!barberoActivo && (
                <select value={turnoFiltroBarbero} onChange={e=>setTurnoFiltroBarbero(e.target.value)} style={{ ...sInp(false),color:"#f0ede6",appearance:"none",marginBottom:18 }}>
                  <option value="Todos">Todos los barberos</option>
                  {BARBEROS.map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              )}

              {/* Lista */}
              {lista.length===0
                ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>No hay turnos {turnoModo==="dia"?"para este día":"esta semana"}.</div>
                : Object.keys(porFecha).sort().map(f=>(
                  <div key={f} style={{ marginBottom:16 }}>
                    {turnoModo==="semana"&&<div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"capitalize",fontWeight:600 }}>{diaNombre(f)} · {formatFecha(f+"T12:00:00")}</div>}
                    {porFecha[f].map(t=>{
                      const hh = horasHasta(t.fecha, t.hora);
                      const proximo = hh >= 0 && hh < 48;
                      return (
                      <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:`1px solid ${proximo?"#3a2e16":"#1e1e1e"}`,marginBottom:8 }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                            <div style={{ fontSize:17,fontWeight:800,color:"#f2efe8",minWidth:52 }}>{t.hora}</div>
                            <div>
                              <div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div>
                              <div style={{ fontSize:12,color:"#888" }}>✂️ {t.barbero.split(" ")[0]} · {t.barba?"corte+barba":"corte"}{t.telefono?` · 📞 ${t.telefono}`:""}</div>
                              {t.nota&&<div style={{ fontSize:12,color:"#666",marginTop:2 }}>{t.nota}</div>}
                            </div>
                          </div>
                          <button onClick={()=>setConfirmDeleteTurno(t.id)} style={{ background:"transparent",border:"none",color:"#e05c5c",fontSize:16,cursor:"pointer",lineHeight:1 }}>✕</button>
                        </div>
                        {proximo && esAdmin && (
                          <div style={{ marginTop:8,padding:"6px 10px",background:"rgba(176,154,120,0.12)",borderRadius:6,fontSize:11.5,color:"#b09a78" }}>
                            ⏰ Faltan menos de 48 hs — {ADMIN_NOMBRE.split(" ")[0]}, recordá enviar el WhatsApp
                          </div>
                        )}
                        <div style={{ display:"flex",gap:8,marginTop:10 }}>
                          <a href={waLink(t)} target="_blank" rel="noopener noreferrer" style={{ flex:1,textAlign:"center",textDecoration:"none",padding:"8px 0",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12.5,fontWeight:700 }}>💬 WhatsApp</a>
                          {esAdmin && <button onClick={()=>turnoACorte(t)} style={{ flex:1,padding:"8px 0",borderRadius:8,border:"none",background:"#2a2a2a",color:"#f0ede6",fontSize:12.5,fontWeight:700,cursor:"pointer" }}>→ Corte</button>}
                        </div>
                      </div>
                    );})}
                  </div>
                ))
              }
            </div>
          );
        })()}

        {/* ── CLIENTES (admin) ── */}
        {vista === "clientes" && esAdmin && (() => {
          // Solo clientes con ficha guardada (no cualquiera que aparezca en un corte o turno)
          let lista = clientes.map(c=>c.nombre).filter(Boolean).sort((a,b)=>a.localeCompare(b));
          const q = clienteBuscar.trim().toLowerCase();
          if (q) lista = lista.filter(n=>n.toLowerCase().includes(q));
          return (
            <div style={{ paddingTop:20 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <div style={{ fontSize:16,fontWeight:700,color:"#f2efe8" }}>Clientes</div>
                <button onClick={()=>setMostrarNuevoCliente(v=>!v)} style={{ width:32,height:32,borderRadius:16,border:"none",background:mostrarNuevoCliente?"#2a2a2a":"#f2efe8",color:mostrarNuevoCliente?"#f0ede6":"#0f0f0f",fontSize:18,fontWeight:800,cursor:"pointer",lineHeight:1 }}>{mostrarNuevoCliente?"✕":"+"}</button>
              </div>

              {mostrarNuevoCliente && (
                <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:16,border:"1px solid #232323" }}>
                  <div style={{ fontSize:14,fontWeight:700,marginBottom:12,color:"#f2efe8" }}>Nuevo cliente</div>
                  <ClienteFichaForm clienteForm={clienteForm} setClienteForm={setClienteForm} errors={clienteFormErrors} setErrors={setClienteFormErrors} sInp={sInp}
                    lockNombre={false} showBarbero={true} barberos={BARBEROS} onSave={handleAgregarClienteManual} saveLabel="Guardar cliente" />
                </div>
              )}

              <input placeholder="Buscar cliente…" value={clienteBuscar} onChange={e=>setClienteBuscar(e.target.value)} style={{ ...sInp(false),marginBottom:16 }} />
              {lista.length===0
                ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>{q?"Sin coincidencias.":"Todavía no hay clientes."}</div>
                : lista.map(n=>(
                  <ClienteCard key={n} nombre={n} telefono={telDeCliente(n)} ficha={fichaDeCliente(n)} servicios={serviciosDeCliente(n)}
                    abierto={clienteDetalle===n} onToggle={()=>setClienteDetalle(clienteDetalle===n?null:n)}
                    onAgendar={()=>agendarParaCliente(n,telDeCliente(n))}
                    onEditar={()=>{ setClienteForm({ nombre:n, ...fichaDeCliente(n) }); setClienteFormErrors({}); setEditarCliente(n); }}
                    fmt={fmt} formatFecha={formatFecha} waCliente={waCliente} />
                ))
              }
            </div>
          );
        })()}

        {/* ── APROBACIONES (admin) ── */}
        {vista === "aprobaciones" && esAdmin && (
          <div style={{ paddingTop:24 }}>
            <button onClick={()=>setVista("inicio")} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16,fontWeight:600 }}>← Volver</button>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Aprobaciones</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:20 }}>Cortes y puntos solicitados por barberos</div>
            {pendientes.length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>No hay nada pendiente. ✓</div>
              : pendientes.map(p=>(
                <div key={p.id} style={{ background:"#141414",borderRadius:12,padding:16,border:"1px solid #3a2e16",marginBottom:10 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                        <span style={{ fontSize:11,background:p.kind==="corte"?"#16242e":"#1e2630",color:"#5a9fd4",borderRadius:4,padding:"2px 7px",fontWeight:700 }}>{p.kind==="corte"?"CORTE":"MEMBRESÍA"}</span>
                        <span style={{ fontSize:13,fontWeight:600 }}>{p.solicitante?.split(" ")[0]}</span>
                      </div>
                      {p.kind==="corte"
                        ? <div style={{ fontSize:13,color:"#aaa" }}>{p.data.cliente} · {p.data.servicio} · {fmt(p.data.monto)} ({p.data.medioPago}){p.data.propina?` · propina ${fmt(p.data.propina)}`:""}</div>
                        : <div style={{ fontSize:13,color:"#aaa" }}>{p.data.cliente} · {p.data.tipo} · {fmt(p.data.monto)} ({p.data.medioPago})</div>
                      }
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:8 }}>
                    <button onClick={()=>rechazarPendiente(p.id)} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"1px solid #3a1e1e",background:"transparent",color:"#e05c5c",fontSize:13,fontWeight:700,cursor:"pointer" }}>Rechazar</button>
                    <button onClick={()=>aprobarPendiente(p.id)} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontSize:13,fontWeight:700,cursor:"pointer" }}>Aprobar</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* ── MI PANEL (barbero) ── */}
        {/* ── BARBERO: RESUMEN ── */}
        {vista === "barbero" && barberoActivo && (() => {
          const cor = comisionCortesBarbero(barberoActivo);
          const mem = comisionMembresiaBarbero(barberoActivo);
          const misCortes = cortes.filter(c=>c.barbero===barberoActivo);
          const misPendientes = pendientes.filter(p=>p.solicitante===barberoActivo);
          const finManana = (()=>{ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); })();
          const misTurnos = turnos.filter(t=>t.barbero===barberoActivo && (t.fecha===hoy()||t.fecha===finManana)).sort((a,b)=>(a.fecha+a.hora).localeCompare(b.fecha+b.hora));
          const turnosHoyCount = turnos.filter(t=>t.barbero===barberoActivo && t.fecha===hoy()).length;
          const cortesPeriodo = filtrarPorPeriodo(misCortes, periodoResumen);
          const dineroPeriodo = cortesPeriodo.reduce((a,c)=>a+c.monto+c.propina,0);
          const labelPeriodo = periodoResumen==="hoy"?"hoy":periodoResumen==="semana"?"esta semana":"este mes";
          const porCobrar = cor.pendiente + mem.vencidoPendiente;
          const clientesPeriodo = [...new Set(cortesPeriodo.map(c=>c.cliente))];
          let nuevosPeriodo = 0;
          clientesPeriodo.forEach(nombre => {
            const propios = misCortes.filter(c => c.cliente === nombre);
            const primera = propios.reduce((min,c)=> c.fecha < min ? c.fecha : min, propios[0].fecha);
            if (fechaEnPeriodo(primera, periodoResumen)) nuevosPeriodo++;
          });
          const recurrentesPeriodo = clientesPeriodo.length - nuevosPeriodo;

          const cerrar = () => setModalBarbero(null);

          return (
            <div style={{ paddingTop:24 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Hola, {barberoActivo.split(" ")[0]} 👋</div>

              {/* ACCIÓN PRINCIPAL: Cargar corte */}
              <button onClick={()=>setModalBarbero("corte")} style={{ width:"100%",padding:"20px 0",borderRadius:16,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:19,cursor:"pointer",marginBottom:14,boxShadow:"0 4px 20px rgba(242,239,232,0.15)" }}>
                ✂️ Cargar corte
              </button>

              {/* Accesos rápidos secundarios */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20 }}>
                {[
                  { id:"turno", icon:"📅", label:"Turno" },
                  { id:"membresia", icon:"🎫", label:"Membresía" },
                  { id:"cliente", icon:"➕", label:"Cliente" },
                ].map(a=>(
                  <button key={a.id} onClick={()=>setModalBarbero(a.id)} style={{ background:"#141414",border:"1px solid #232323",borderRadius:12,padding:"12px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                    <span style={{ fontSize:18 }}>{a.icon}</span>
                    <span style={{ fontSize:10.5,color:"#aaa",fontWeight:600,textAlign:"center" }}>{a.label}</span>
                  </button>
                ))}
              </div>

              {/* Estado del día */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #2a2218" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Por cobrar</div><div style={{ fontSize:19,fontWeight:800,color:"#f2efe8" }}>{fmt(porCobrar)}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Turnos hoy</div><div style={{ fontSize:19,fontWeight:800 }}>{turnosHoyCount}</div></div>
              </div>

              {/* Turnos hoy / mañana */}
              {misTurnos.length>0 && (
                <>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Mis turnos hoy y mañana</div>
                  {misTurnos.map(t=>(
                    <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"10px 14px",border:`1px solid ${t.fecha===hoy()?"#3a2e16":"#1e1e1e"}`,marginBottom:6,display:"flex",alignItems:"center",gap:12 }}>
                      <div style={{ textAlign:"center",minWidth:54 }}>
                        <div style={{ fontSize:11,color:"#888" }}>{t.fecha===hoy()?"Hoy":"Mañana"}</div>
                        <div style={{ fontSize:15,fontWeight:800,color:"#f2efe8" }}>{t.hora}</div>
                      </div>
                      <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{t.barba?"corte+barba":"corte"}</div></div>
                    </div>
                  ))}
                  <div style={{ height:12 }} />
                </>
              )}

              {/* Mis pendientes */}
              {misPendientes.length>0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Esperando aprobación</div>
                  {misPendientes.map(p=>(
                    <div key={p.id} style={{ background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #3a2e16",marginBottom:6,fontSize:13,color:"#b09a78" }}>
                      {p.kind==="corte"?`Corte · ${p.data.cliente} · ${fmt(p.data.monto)}`:`Membresía · ${p.data.cliente} · ${p.data.tipo}`}
                    </div>
                  ))}
                </div>
              )}

              {/* Estadísticas con período */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Mi actividad</div>
              <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:10,border:"1px solid #232323" }}>
                {[{id:"hoy",label:"Hoy"},{id:"semana",label:"Esta semana"},{id:"mes",label:"Este mes"}].map(m=>(
                  <button key={m.id} onClick={()=>setPeriodoResumen(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:periodoResumen===m.id?"#f2efe8":"transparent",color:periodoResumen===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
                ))}
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Cortes · {labelPeriodo}</div><div style={{ fontSize:18,fontWeight:800 }}>{cortesPeriodo.length}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Generado · {labelPeriodo}</div><div style={{ fontSize:18,fontWeight:800,color:"#7ec87e" }}>{fmt(dineroPeriodo)}</div></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Clientes nuevos</div><div style={{ fontSize:18,fontWeight:800 }}>{nuevosPeriodo}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Recurrentes</div><div style={{ fontSize:18,fontWeight:800 }}>{recurrentesPeriodo}</div></div>
              </div>

              {/* Ver historial completo */}
              <button onClick={()=>setVista("bhistorial")} style={{ width:"100%",padding:"13px 0",borderRadius:10,border:"1px solid #2a2a2a",background:"transparent",color:"#aaa",fontWeight:600,fontSize:14,cursor:"pointer" }}>
                Ver historial completo →
              </button>

              {/* ── MODALES DE ACCIONES RÁPIDAS ── */}
              {modalBarbero==="corte" && (
                <ActionModal title="Cargar corte" subtitle={`Queda pendiente hasta que ${ADMIN_NOMBRE.split(" ")[0]} lo apruebe.`} onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <Sel sInp={sInp} field="servicio" options={SERVICIOS} placeholder="Tipo de servicio" value={form.servicio} errs={errors} onChange={e=>{setForm(f=>({...f,servicio:e.target.value}));setErrors(er=>({...er,servicio:false}));}} />
                    <ClienteInput value={form.cliente} clientes={clientes} err={errors.cliente} sInp={sInp}
                      onChange={v=>{setForm(f=>({...f,cliente:v}));setErrors(er=>({...er,cliente:false}));}}
                      onPick={c=>setForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                    <input type="tel" placeholder="Teléfono (opcional)" value={form.telefono} style={sInp(false)} onChange={e=>setForm(f=>({...f,telefono:e.target.value}))} />
                    <Sel sInp={sInp} field="medioPago" options={MEDIOS_PAGO} placeholder="Medio de pago" value={form.medioPago} errs={errors} onChange={e=>{setForm(f=>({...f,medioPago:e.target.value}));setErrors(er=>({...er,medioPago:false}));}} />
                    <div style={{ display:"flex",gap:10 }}>
                      <input placeholder="Monto ($)" type="number" value={form.monto} style={{...sInp(errors.monto),flex:1}} onChange={e=>{setForm(f=>({...f,monto:e.target.value}));setErrors(er=>({...er,monto:false}));}} />
                      <input placeholder="Propina" type="number" value={form.propina} style={{...sInp(false),flex:1}} onChange={e=>setForm(f=>({...f,propina:e.target.value}))} />
                    </div>
                    {(form.servicio==="Corte"||form.servicio==="Corte y Barba") && (
                      <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:13,color:"#aaa",display:"flex",justifyContent:"space-between" }}>
                        <span>Tu comisión</span><span style={{ color:"#f2efe8",fontWeight:700 }}>{fmt(comisionBarbero(form.servicio,form.monto?Number(form.monto):0,form.propina?Number(form.propina):0))}</span>
                      </div>
                    )}
                    <button onClick={()=>{ const e={}; if(!form.servicio)e.servicio=true; if(!form.cliente.trim())e.cliente=true; if(!form.medioPago)e.medioPago=true; if(!form.monto||Number(form.monto)<=0)e.monto=true; if(Object.keys(e).length){setErrors(e);return;} conVerificacionCliente(form.cliente, form.telefono, "corte", ()=>{ solicitarCorte({ servicio:form.servicio, cliente:form.cliente.trim(), telefono:form.telefono.trim(), barbero:barberoActivo, medioPago:form.medioPago, monto:form.monto, propina:form.propina }); setForm(initialForm); setErrors({}); cerrar(); }); }} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Enviar a aprobación</button>
                  </div>
                </ActionModal>
              )}

              {modalBarbero==="turno" && (
                <ActionModal title="Agendar turno" subtitle="Se agenda directo, sin aprobación." onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <div style={{ display:"flex",gap:8 }}>
                      <input type="date" value={turnoForm.fecha} onChange={e=>{setTurnoForm(f=>({...f,fecha:e.target.value}));setTurnoErrors(er=>({...er,fecha:false}));}} style={{ ...sInp(turnoErrors.fecha),flex:2 }} />
                      <select value={turnoForm.hora} onChange={e=>{setTurnoForm(f=>({...f,hora:e.target.value}));setTurnoErrors(er=>({...er,hora:false}));}} style={{ ...sInp(turnoErrors.hora),flex:1,color:turnoForm.hora?"#f0ede6":"#666",appearance:"none" }}>
                        <option value="">Hora</option>
                        {Array.from({length:((21-9)*4)+4},(_, i)=>{ const min=9*60+i*15; const h=String(Math.floor(min/60)).padStart(2,"0"); const m=String(min%60).padStart(2,"0"); return <option key={i} value={`${h}:${m}`}>{h}:{m}</option>; })}
                      </select>
                    </div>
                    <ClienteInput value={turnoForm.cliente} clientes={clientes} err={turnoErrors.cliente} sInp={sInp} placeholder="Nombre completo del cliente"
                      onChange={v=>{setTurnoForm(f=>({...f,cliente:v}));setTurnoErrors(er=>({...er,cliente:false}));}}
                      onPick={c=>setTurnoForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                    <input type="tel" placeholder="Número de teléfono" value={turnoForm.telefono} style={sInp(turnoErrors.telefono)} onChange={e=>{setTurnoForm(f=>({...f,telefono:e.target.value}));setTurnoErrors(er=>({...er,telefono:false}));}} />
                    <div style={{ display:"flex",gap:8 }}>
                      {[{v:false,l:"Solo corte"},{v:true,l:"Con barba"}].map(o=>(
                        <button key={o.l} onClick={()=>setTurnoForm(f=>({...f,barba:o.v}))} style={{ flex:1,padding:"10px 0",borderRadius:8,border:`1.5px solid ${turnoForm.barba===o.v?"#f2efe8":"#2a2a2a"}`,background:turnoForm.barba===o.v?"#1f1d18":"#181818",color:turnoForm.barba===o.v?"#f2efe8":"#888",fontSize:13,fontWeight:600,cursor:"pointer" }}>{o.l}</button>
                      ))}
                    </div>
                    <input placeholder="Nota (opcional)" value={turnoForm.nota} style={sInp(false)} onChange={e=>setTurnoForm(f=>({...f,nota:e.target.value}))} />
                    <button onClick={()=>{ handleAgregarTurno(); }} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Agendar</button>
                    {Object.values(turnoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá fecha, hora, cliente y teléfono.</div>}
                  </div>
                </ActionModal>
              )}

              {modalBarbero==="membresia" && (
                <ActionModal title="Vender membresía" subtitle={`Queda pendiente hasta que ${ADMIN_NOMBRE.split(" ")[0]} la apruebe.`} onClose={cerrar}>
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <ClienteInput value={paseForm.cliente} clientes={clientes} err={paseErrors.cliente} sInp={sInp}
                      onChange={v=>{setPaseForm(f=>({...f,cliente:v}));setPaseErrors(er=>({...er,cliente:false}));}}
                      onPick={c=>setPaseForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                    <input type="tel" placeholder="Teléfono" value={paseForm.telefono} style={sInp(paseErrors.telefono)} onChange={e=>{setPaseForm(f=>({...f,telefono:e.target.value}));setPaseErrors(er=>({...er,telefono:false}));}} />
                    <select value={paseForm.tipo} onChange={e=>{setPaseForm(f=>({...f,tipo:e.target.value}));setPaseErrors(er=>({...er,tipo:false}));}} style={{ ...sInp(paseErrors.tipo),color:paseForm.tipo?"#f0ede6":"#666",appearance:"none" }}>
                      <option value="">Tipo de membresía</option>
                      {TIPOS_PASE.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                    <select value={paseForm.medioPago} onChange={e=>{setPaseForm(f=>({...f,medioPago:e.target.value}));setPaseErrors(er=>({...er,medioPago:false}));}} style={{ ...sInp(paseErrors.medioPago),color:paseForm.medioPago?"#f0ede6":"#666",appearance:"none" }}>
                      <option value="">Medio de pago</option>
                      {MEDIOS_PAGO.map(m=><option key={m} value={m}>{m}</option>)}
                    </select>
                    <input placeholder="Monto cobrado ($)" type="number" value={paseForm.monto} style={sInp(paseErrors.monto)} onChange={e=>{setPaseForm(f=>({...f,monto:e.target.value}));setPaseErrors(er=>({...er,monto:false}));}} />
                    {paseForm.tipo && <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#888" }}>Vence en {PASE_CONFIG[paseForm.tipo].dias} días · vos titular de la membresía</div>}
                    <button onClick={()=>{ const e={}; if(!paseForm.cliente.trim())e.cliente=true; if(!paseForm.telefono.trim())e.telefono=true; if(!paseForm.tipo)e.tipo=true; if(!paseForm.medioPago)e.medioPago=true; if(!paseForm.monto||Number(paseForm.monto)<=0)e.monto=true; if(Object.keys(e).length){setPaseErrors(e);return;} conVerificacionCliente(paseForm.cliente, paseForm.telefono, "membresía", ()=>{ solicitarMembresia({ cliente:paseForm.cliente.trim(), telefono:paseForm.telefono.trim(), tipo:paseForm.tipo, barbero:barberoActivo, medioPago:paseForm.medioPago, monto:paseForm.monto }); setPaseForm(initialPaseForm); setPaseErrors({}); cerrar(); }); }} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4 }}>Enviar a aprobación</button>
                  </div>
                </ActionModal>
              )}

              {modalBarbero==="cliente" && (
                <ActionModal title="Nuevo cliente" subtitle={`Queda asignado a vos y visible para ${ADMIN_NOMBRE.split(" ")[0]}.`} onClose={cerrar}>
                  <ClienteFichaForm clienteForm={clienteForm} setClienteForm={setClienteForm} errors={clienteFormErrors} setErrors={setClienteFormErrors} sInp={sInp}
                    lockNombre={false} showBarbero={false} barberos={BARBEROS}
                    onSave={()=>{ setClienteForm(f=>({...f,barbero:barberoActivo})); handleAgregarClienteManual(); cerrar(); }} saveLabel="Guardar cliente" />
                </ActionModal>
              )}
            </div>
          );
        })()}

        {/* ── BARBERO: HISTORIAL ── */}
        {vista === "bhistorial" && barberoActivo && (() => {
          const misCortes = cortes.filter(c=>c.barbero===barberoActivo);
          const misPasesActivos = pases.filter(p=>p.barbero===barberoActivo && horasHasta(p.vence.slice(0,10),"23:59")>=0);
          // Mis clientes = solo los que tienen ficha guardada (atendidos por mí o asignados por admin)
          const nombresConFicha = new Set(clientes.map(c=>c.nombre));
          const nombresAtendidos = new Set(misCortes.map(c=>c.cliente).filter(n=>nombresConFicha.has(n)));
          const nombresAsignados = new Set(clientes.filter(c=>c.barbero===barberoActivo).map(c=>c.nombre));
          let listaClientes = [...new Set([...nombresAtendidos, ...nombresAsignados])].filter(Boolean).sort((a,b)=>a.localeCompare(b));
          const q = clienteBuscar.trim().toLowerCase();
          if (q) listaClientes = listaClientes.filter(n=>n.toLowerCase().includes(q));
          return (
            <div style={{ paddingTop:24 }}>
              <button onClick={()=>setVista("barbero")} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16,fontWeight:600 }}>← Volver</button>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Mi historial de cortes</div>
              {misCortes.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 20px" }}>Sin cortes registrados.</div>
                : misCortes.map(c=>(
                  <div key={c.id} style={{ background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",justifyContent:"space-between" }}>
                    <div><div style={{ fontSize:14,fontWeight:600 }}>{c.cliente}</div><div style={{ fontSize:12,color:"#666" }}>{c.servicio} · {formatFecha(c.fecha)}</div></div>
                    <div style={{ textAlign:"right" }}><div style={{ fontSize:14,fontWeight:700,color:"#b09a78" }}>{fmt(c.comision||0)}</div></div>
                  </div>
                ))
              }

              {/* Membresías activas */}
              <div style={{ fontSize:12,color:"#888",margin:"20px 0 8px",textTransform:"uppercase",letterSpacing:1 }}>Membresías activas</div>
              {misPasesActivos.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>No tenés membresías activas.</div>
                : misPasesActivos.map(p=>{
                  const tel = telDeCliente(p.cliente);
                  return (
                    <div key={p.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e2a1e",marginBottom:8 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                        <div><div style={{ fontSize:14,fontWeight:600 }}>{p.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{p.tipo} · {p.visitas.length} visita{p.visitas.length!==1?"s":""} · vence {formatFecha(p.vence)}</div></div>
                        {tel && <a href={waCliente(p.cliente,tel)} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",padding:"6px 12px",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12,fontWeight:700 }}>💬</a>}
                      </div>
                      <div style={{ display:"flex",gap:8,marginTop:10 }}>
                        <select value={visitaBarbero[p.id]||barberoActivo} onChange={e=>setVisitaBarbero(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),flex:1,color:"#f0ede6",appearance:"none",padding:"7px 10px" }}>
                          {BARBEROS.map(b=><option key={b} value={b}>{b}{b===p.barbero?" (titular)":""}</option>)}
                        </select>
                        <input type="number" placeholder="Propina" value={visitaPropina[p.id]||""} onChange={e=>setVisitaPropina(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),width:90,padding:"7px 10px" }} />
                        <button onClick={()=>handleRegistrarVisita(p.id)} style={{ padding:"0 14px",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap" }}>+ Visita</button>
                      </div>
                    </div>
                  );
                })
              }

              {/* Mis clientes (atendidos + asignados por admin) */}
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",margin:"18px 0 10px" }}>
                <div style={{ fontSize:12,color:"#888",textTransform:"uppercase",letterSpacing:1 }}>Mis clientes</div>
                <button onClick={()=>{ setMostrarNuevoCliente(v=>!v); setClienteForm(f=>({...f,barbero:barberoActivo})); }} style={{ width:30,height:30,borderRadius:15,border:"none",background:mostrarNuevoCliente?"#2a2a2a":"#f2efe8",color:mostrarNuevoCliente?"#f0ede6":"#0f0f0f",fontSize:17,fontWeight:800,cursor:"pointer",lineHeight:1 }}>{mostrarNuevoCliente?"✕":"+"}</button>
              </div>

              {mostrarNuevoCliente && (
                <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:16,border:"1px solid #232323" }}>
                  <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Nuevo cliente</div>
                  <div style={{ fontSize:11,color:"#666",marginBottom:12 }}>Queda asignado a vos y visible para {ADMIN_NOMBRE.split(" ")[0]}.</div>
                  <ClienteFichaForm clienteForm={clienteForm} setClienteForm={setClienteForm} errors={clienteFormErrors} setErrors={setClienteFormErrors} sInp={sInp}
                    lockNombre={false} showBarbero={false} barberos={BARBEROS} onSave={()=>{ setClienteForm(f=>({...f,barbero:barberoActivo})); handleAgregarClienteManual(); }} saveLabel="Guardar cliente" />
                </div>
              )}

              <input placeholder="Buscar cliente…" value={clienteBuscar} onChange={e=>setClienteBuscar(e.target.value)} style={{ ...sInp(false),marginBottom:14 }} />
              {listaClientes.length===0
                ? <div style={{ textAlign:"center",color:"#555",padding:"30px 0",fontSize:14 }}>{q?"Sin coincidencias.":"Todavía no tenés clientes."}</div>
                : listaClientes.map(n=>(
                  <ClienteCard key={n} nombre={n} telefono={telDeCliente(n)} ficha={fichaDeCliente(n)} servicios={serviciosDeCliente(n).filter(c=>c.barbero===barberoActivo)}
                    abierto={clienteDetalle===n} onToggle={()=>setClienteDetalle(clienteDetalle===n?null:n)}
                    onAgendar={()=>agendarParaCliente(n,telDeCliente(n))}
                    onEditar={()=>{ setClienteForm({ nombre:n, ...fichaDeCliente(n) }); setClienteFormErrors({}); setEditarCliente(n); }}
                    fmt={fmt} formatFecha={formatFecha} waCliente={waCliente} />
                ))
              }
            </div>
          );
        })()}

      </div>
    </div>
  );
}
