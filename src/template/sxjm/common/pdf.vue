<template>
  <div>
      <div style="text-align:right;padding: 20px">
            <el-button :loading="loading" @click="saveHtml">{{loading?'正在生成PDF':'保存到本地PDF'}}</el-button>
      </div>
   

    <div id="pdf">
      <p style="margin:0pt 0pt 7.8pt; orphans:0; text-align:center; widows:0">
        <span style="font-size:18pt; font-weight:400">2022</span>
        <span style="font-size:18pt; font-weight:400">年全国大学生数学建模竞赛参赛信息表</span>
      </p>
      <div style="text-align:center">
        <table
          cellspacing="0"
          cellpadding="0"
          style="border-collapse:collapse; margin:0 auto; width:487.45pt"
        >
          <tr style="height:16.8pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:65.5pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">学校名称</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:160.75pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span
                  style="font-size:11pt; font-weight:400"
                >{{school.schoolName}}</span>
              </p>
            </td>
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:69.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">参赛队数</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:83.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">本科组</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.25pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span
                  style="font-size:14pt; font-weight:400"
                >{{school.undergraduateTeams}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:25.95pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:65.5pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">邮政编码</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:160.75pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span
                  style="font-size:14pt; font-weight:400"
                >{{school.schoolZipcode}}</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:83.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">大专组</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.25pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span
                  style="font-size:14pt; font-weight:400"
                >{{school.specialistTeams}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:24.8pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:65.5pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">学校地址</span>
              </p>
            </td>
            <td
              colspan="5"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:399.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:11pt; font-weight:400">{{school.schoolAddress}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:33.15pt">
            <td
              rowspan="3"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:65.5pt"
            >
              <p style="line-height:18pt; margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">竞赛</span>
              </p>
              <p style="line-height:18pt; margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">负责人</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:82.55pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">姓名</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:147.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">联系电话</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:83.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">所在部门</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:53.25pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">Email</span>
              </p>
            </td>
          </tr>
          <tr style="height:23.25pt">
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:82.55pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">{{school.chargeName}}</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:147.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10.5pt; font-weight:400">M</span>
                <span style="font-size:10.5pt; font-weight:400">：{{school.chargeTel}}</span>
              </p>
            </td>
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:83.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10pt; font-weight:400">{{school.chargePart}}</span>
              </p>
            </td>
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:53.25pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10pt; font-weight:400">{{school.chargeEmail}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.2pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:147.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10.5pt; font-weight:400">O</span>
                <span style="font-size:10.5pt; font-weight:400">：{{school.chargePhone}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:22.6pt">
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:65.5pt"
            >
              <p style="line-height:18pt; margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">竞赛</span>
              </p>
              <p style="line-height:18pt; margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">联系人</span>
              </p>
            </td>
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:82.55pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt; font-weight:400">{{school.personName}}</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:147.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10.5pt; font-weight:400">M</span>
                <span style="font-size:10.5pt; font-weight:400">：{{school.personTel}}</span>
              </p>
            </td>
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:83.6pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10pt; font-weight:400">{{school.personPart}}</span>
              </p>
            </td>
            <td
              rowspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:53.25pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10pt; font-weight:400">{{school.personEmail}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:22.25pt">
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:147.8pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:10.5pt; font-weight:400">O</span>
                <span style="font-size:10.5pt; font-weight:400">：{{school.personPhone}}</span>
              </p>
            </td>
          </tr>
          <tr style="height:311.2pt">
            <td
              colspan="6"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:475.9pt"
            >
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20.6pt; widows:0">
                <span style="font-size:14pt">参赛承诺：</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:12pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-size:14pt">我们一定遵守竞赛章程和有关规定，公平竞赛，争取好成绩。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:14pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:150px; widows:0">
                <span style="font-size:12pt">学校竞赛负责人签名：</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:265.55pt; widows:0">
                <span style="font-size:14pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:265.55pt; widows:0">
                <span style="font-size:14pt">&#xa0;</span>
              </p>
              <p style="margin: 0pt;padding-right: 25px;text-align: right;">
                <span>(盖章)</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:12pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0;text-indent:-130px">
                <span
                  style="font-size:10.5pt"
                >年 &nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp; 日</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-size:12pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:76.3pt; border:none"></td>
            <td style="width:93.35pt; border:none"></td>
            <td style="width:78.2pt; border:none"></td>
            <td style="width:80.4pt; border:none"></td>
            <td style="width:94.4pt; border:none"></td>
            <td style="width:64.05pt; border:none"></td>
          </tr>
        </table>
      </div>
      <div style="margin:10px auto; width:487.45pt">
        <p
          style="font-size:10.5pt; line-height:125%; margin:0pt 0pt 0pt 35.5pt; orphans:0; text-align:justify; text-indent:-35.5pt; widows:0"
        >
          <span style="font-size:10.5pt">★</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;</span>
          <span style="font-size:10.5pt; font-weight:400">
           注：下载表格信息需学校盖章，请于7月1日前加盖公章扫描发送到邮箱 lujie0424@zju.edu.cn。
          </span>
        </p>
       
        <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
          <span style="font-size:10.5pt; font-weight:400">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
          <span style="font-size:10.5pt">&#xa0;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import api from '@/api/index'
export default {
  data() {
    return {
      school: {
        schoolZipcode: "300311",
        chargeEmail: "负责人邮箱",
        chargeName: "负责人姓名",
        chargeTel: "负责人手机",
        chargePhone:'电话',
        personEmail: "联系人邮箱",
        personName: "联系人姓名",
        personTel: "联系人手机",
        schoolAddress: "学校地址",
        personPhone:'电话',
        schoolCode: "学校代码",
        schoolName: "学校名称",
        specialistTeams: "专科队伍数",
        undergraduateTeams: "本科队伍数",
        personPart:"联系人所在部门",
        chargePart:"负责人所在部门",
      },
      loading:true,
    };
  },
  created(){
    this.init();
  },
  methods: {
    async init(){
      let user = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"));
      let school = await api.getSchoolApply({data:{
          type:1,
          userId:user.id,
      }})
      let _this = this
      if(school=='error' || !school) 
        return this.$confirm('未查询到您的报名信息，请先报名！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
          _this.$router.push("/")
        }).catch(()=>{
          _this.$router.push("/")
      });
      this.school = school
      this.loading = false
      

    },
    saveHtml() {
      var element = document.getElementById("pdf");
      var opt = {
        margin: [1.2, 0, 0, 0],
        filename: "2022 年全国大学生数学建模竞赛参赛信息表.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
      html2pdf()
        .set(opt)
        .from(element)
        .save();
    }
  }
};
</script>

<style scoped>
</style>
